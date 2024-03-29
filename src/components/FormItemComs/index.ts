import FormItemInput from "./FormItemInput.vue";
import FormItemInputNumber from "./FormItemInputNumber.vue";
import FormItemTextArea from "./FormItemTextArea.vue";
import FormItemSelect from "./FormItemSelect.vue";
import FormItemTreeSelect from "./FormItemTreeSelect.vue";
import FormItemDatePicker from "./FormItemDatePicker.vue";
import FormItemRangePicker from "./FormItemRangePicker.vue";
import FormItemUpload from "./FormItemUpload.vue";
import FormItemAddress from "./FormItemAddress.vue";

interface ComsType {
  [key: string]: any
}

const ComponentMap: ComsType = {
  "input": FormItemInput,
  "input-number": FormItemInputNumber,
  "textarea": FormItemTextArea,
  "select": FormItemSelect,
  "tree-select": FormItemTreeSelect,
  "date-picker": FormItemDatePicker,
  "date-range-picker": FormItemRangePicker,
  "upload": FormItemUpload,
  "address": FormItemAddress
}

export default ComponentMap;

export {
  FormItemInput,
  FormItemInputNumber,
  FormItemTextArea,
  FormItemSelect,
  FormItemTreeSelect,
  FormItemDatePicker
}