import {onCommandHook} from "./src/hooks/onCommandHook";
import {onAggregateHook} from "./src/hooks/onAggregateHook";

const CodyConfig = {
  context: {},
  hooks: {
    onCommand: onCommandHook,
    onAggregate: onAggregateHook,
//    onEvent: onEventHook,
//    onPolicy: onPolicyHook,
//    onDocument: onDocumentHook,
  }
};

module.exports = CodyConfig;
