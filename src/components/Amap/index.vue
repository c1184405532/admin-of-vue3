
<template>
  <a-modal
    v-bind="props"
    v-model:visible="_visible"
  >
    <div class="amap-container-box">
      <a-input-group compact class="input-group-box">
        <a-select
          v-model:value="inputValue"
          @search="onSearch"
          @change="onChange"
          :allowClear="true"
          :showSearch="true"
          :showArrow="false"
          :filter-option="false"
          :default-active-first-option="false"
          placeholder="请输入地址"
          class="select-box"
        >
          <a-select-option v-for="v in addressList" :key="v.id">
            {{ v.name + ` - (${v.address || ""})` }}
          </a-select-option>
        </a-select>
        <a-button @click="onOk">确定</a-button>
      </a-input-group>
      <div class="amap-container" id="amap-container"></div>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, toRefs, watch, nextTick } from "vue";

  import { notification } from "ant-design-vue";
  import type { ModalProps } from "ant-design-vue";
  import type { AddressType, AddressListType } from "./";

  import { defaultProps, AampWebJsKey } from "./const";

  interface PropsType extends ModalProps {
    modelValue: boolean,
    width?: number,
    footer?: ModalProps["footer"]
  }

  interface EmitsType {
    (e: "update:modelValue", value: boolean): void;
    (e: "submit", value: AddressType): void;
  }

  const emits = defineEmits<EmitsType>();
  const props =  withDefaults(defineProps<PropsType>(), { ...defaultProps });
  const { modelValue } = toRefs(props);
  
  // v-model逻辑
  const _visible = ref(props.modelValue);
  watch(modelValue, value => _visible.value = value);
  watch(_visible, value => {
    emits("update:modelValue", value);
    if (value && !mapRef.value) initMap(); // 显示后加载地图
  });
  
  const mapRef = ref();
  const inputValue = ref();
  const addressList = ref<AddressListType>();

  const onOk = () => {
    const address = addressList.value?.find(v => v.id === inputValue.value);
    if (address) {
      const newValue: AddressType = {...address, value: address.id, label: `${address.name} - (${address.address})`}
      emits("submit", newValue);
      _visible.value = false;
    } else {
      notification.error({
        message: "警告",
        placement: "topRight",
        description: "请选择地址！",
        duration: 3
      })
    }
  }

  let AMapInstance: any;
  let searchAddressTimeOutInstance: any = null;
  const onSearch = (keyword: string) => {
    if (!keyword) return;

    clearTimeout(searchAddressTimeOutInstance);
    searchAddressTimeOutInstance= setTimeout(() => {
      AMapInstance.plugin("AMap.AutoComplete", () => { // https://lbs.amap.com/api/jsapi-v2/guide/services/autocomplete
        const AutoComplete = new AMapInstance.AutoComplete({}); // todo: 可扩展城市下搜索
        AutoComplete.search(keyword, function (status: string, result: any = {}) {
          const { tips = [] } = result;
          addressList.value = tips;
          // if (!tips.length) {
          //   notification.warning({
          //     message: "提示",
          //     placement: "topRight",
          //     description: "未搜索到相关位置!",
          //     duration: 5
          //   })
          // }
        })
      })
    }, 300)
  }

  const onChange = (value: string) => {
    const item = addressList.value?.find(v => v.id === value) || {location: undefined};
    const { location } = item;
    if (location) setMarker([location.lng, location.lat]);
    
  }

  function initMap() {
    nextTick(() => {
      // eslint-disable-next-line
      AMapLoader?.load({
        key: AampWebJsKey, // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        AMapUI: {
          // 是否加载 AMapUI，缺省不加载
          version: "1.1", // AMapUI 版本
          plugins: ["overlay/SimpleMarker"], // 需要加载的 AMapUI ui插件
        },
        Loca: {
          // 是否加载 Loca， 缺省不加载
          version: "2.0", // Loca 版本
        },
      })
        .then((AMap: any) => {
          console.log("AMap", AMap);
          AMapInstance = AMap;
          mapRef.value = new AMap.Map("amap-container", {
            zoom: 11
          });
          // map.addControl(new AMap.Scale());
        })
        .catch((e: any) => {
          console.error("amap load error", e); // 加载错误提示
        });
    })
  }

  let markerInstance: any;
  function setMarker(lnglat: Array<any>) {
    if (markerInstance) markerInstance.setPosition(lnglat);
    else {
      markerInstance = new AMapInstance.Marker({
        icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png",
        position: lnglat,
        offset: new AMapInstance.Pixel(-20, -62)
      });
      markerInstance.setMap(mapRef.value);
    }
    mapRef.value.setCenter(lnglat); // 设置选中位置为地图中心点
  }
</script>

<style lang="less" scoped>
  .amap-container-box{
    .input-group-box{
      display: flex;
      flex-wrap: nowrap;
      margin-top: 24px;
      padding-bottom: 16px;
      .select-box{
        width: 100%;
      }
    }
    .amap-container{
      width: 800px;
      height: 700px;
      border-radius: 6px;
    }
  }
  
</style>