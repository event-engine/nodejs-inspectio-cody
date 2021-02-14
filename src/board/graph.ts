import {List, Record} from "immutable";

export type NodeId = string;
export type NodeName = string;
export type NodeLink = string;
export type NodeTag = string;
export enum NodeType {
  event = 'event',
  command = 'command',
  role = 'role',
  projection = 'projection',
  aggregate = 'aggregate',
  document = 'document',
  policy = 'policy',
  hotSpot = 'hotSpot',
  externalSystem = 'externalSystem',
  ui = 'ui',
  feature = 'feature',
  boundedContext = 'boundedContext',
  freeText = 'freeText',
  textCard = 'textCard',
  edge = 'edge',
  misc = 'misc',
  icon = 'icon',
  image = 'image',
  layer = 'layer'
}

export interface GraphPoint {
  x: number;
  y: number;
}

export interface Node {
  getId: () => NodeId;
  getName: () => NodeName;
  getType: () => NodeType;
  getLink: () => NodeLink;
  getTags: () => List<NodeTag>;
  isLayer: () => boolean;
  isDefaultLayer: () => boolean;
  getParent: () => Node | null;
  getChildren: () => List<Node>;
  getGeometry: () => GraphPoint;
  getSources: () => List<Node>;
  getTargets: () => List<Node>;
  getMetadata: () => string | null;
}

// tslint:disable-next-line:max-classes-per-file
class GraphPointRecord extends Record({x: 0, y: 0}) implements GraphPoint {}

export interface RawNodeRecordProps {
  id: NodeId;
  name: NodeName;
  type: NodeType;
  link: NodeLink | null;
  tags: NodeTag[];
  layer: boolean;
  defaultLayer: boolean;
  parent: RawNodeRecordProps | null;
  childrenList: RawNodeRecordProps[];
  sourcesList: RawNodeRecordProps[];
  targetsList: RawNodeRecordProps[];
  geometry: GraphPoint;
  metadata: string | null;
}

export interface NodeRecordProps {
  id: NodeId;
  name: NodeName;
  type: NodeType;
  link: NodeLink;
  tags: List<NodeTag>;
  layer: boolean;
  defaultLayer: boolean;
  parent: Node | null;
  childrenList: List<Node>;
  sourcesList: List<Node>;
  targetsList: List<Node>;
  geometry: GraphPoint;
  metadata: string | null;
}

const defaultNodeRecordProps: NodeRecordProps = {
  id: '',
  name: '',
  type: NodeType.misc,
  link: '',
  tags: List(),
  layer: false,
  defaultLayer: false,
  parent: null,
  childrenList: List(),
  sourcesList: List(),
  targetsList: List(),
  geometry: {x:0, y:0},
  metadata: null,
};

export const makeNodeRecord = (node: RawNodeRecordProps): NodeRecord => {
  return new NodeRecord({
    id: node.id,
    name: node.name,
    type: node.type,
    link: node.link || '',
    tags: List(node.tags),
    layer: node.layer,
    defaultLayer: node.defaultLayer,
    parent: node.parent? makeNodeRecord(node.parent) : null,
    childrenList: List(node.childrenList.map(makeNodeRecord)),
    sourcesList: List(node.sourcesList.map(makeNodeRecord)),
    targetsList: List(node.targetsList.map(makeNodeRecord)),
    geometry: new GraphPointRecord(node.geometry),
    metadata: node.metadata,
  });
};

// tslint:disable-next-line:max-classes-per-file
export class NodeRecord extends Record(defaultNodeRecordProps) implements Node {
  public getId(): NodeId {
    return this.id;
  }

  public getName(): NodeName {
    return this.name;
  }

  public getType(): NodeType {
    return this.type;
  }

  public getLink(): NodeLink {
    return this.link;
  }

  public getTags(): List<NodeTag> {
    return this.tags;
  }

  public isLayer(): boolean {
    return this.layer;
  }

  public isDefaultLayer(): boolean {
    return this.defaultLayer;
  }

  public getParent(): Node | null {
    return this.parent;
  }

  public getChildren(): List<Node> {
    return this.childrenList;
  }

  public getSources(): List<Node> {
    return this.sourcesList;
  }

  public getTargets(): List<Node> {
    return this.targetsList;
  }

  public getGeometry(): GraphPoint {
    return this.geometry;
  }

  public getMetadata(): string | null {
    return this.metadata;
  }
}
