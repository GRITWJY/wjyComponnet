<template>
  <div>
    <label v-if="label" :class="{ 'i-form-item-label-required': isRequired }">{{
      label
    }}</label>
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" class="i-form-item-message">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import Emitter from "../../mixins/emitter";
import AsyncValidator from "async-validator";

/*
 * Form 组件的核心功能是数据校验，一个 Form 中包含了多个 FormItem，当点击提交按钮时，要逐一对每个 FormItem 内的表单组件校验，而校验是由使用者发起，并通过 Form 来调用每一个 FormItem 的验证方法，再将校验结果汇总后，通过 Form 返回出去。
 * */

export default {
  name: "iFormItem",
  mixins: [Emitter],
  inject: ["form"],
  props: {
    // 单个表单组件的标签文本
    label: {
      type: String,
      default: ""
    },
    // 对应表单域 Form 组件 model 里的字段，用于在校验或重置时访问表单组件绑定的数据
    prop: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isRequired: false, // 是否为必填
      validateState: "", // 校验状态
      validateMessage: "" // 校验不通过时的提示信息
    };
  },
  computed: {
    // 从Form的model中动态得到当前表单组件的数据
    fieldValue() {
      return this.form.model[this.prop];
    }
  },
  // 组件渲染时，将实例缓存在Form中
  mounted() {
    // 如果没有传入prop，则无需校验，也就无需缓存
    if (this.prop) {
      this.dispatch("iForm", "on-form-item-add", this);
      // 设置初始值，以便在重置时恢复默认值
      this.initialValue = this.fieldValue;
      //基础组件有了，接下来要做的，是在 FormItem 中监听来自 Input 组件派发的自定义事件。这里可以在 mounted 中监听，因为你的手速远赶不上组件渲染的速度，不过在 created 中监听也是没任何问题的。
      this.setRules();
    }
  },
  // 组件销毁前，将实例从Form的缓存中移除
  beforeDestroy() {
    this.dispatch("iForm", "on-form-item-remove", this);
  },

  created() {},
  methods: {
    setRules() {
      let rules = this.getRules();
      if (rules.length) {
        rules.every(rule => {
          // 如果当前校验规则中有必填项，则标记出来
          this.isRequired = rule.required;
        });
      }

      this.$on("on-form-blur", this.onFieldBlur);
      this.$on("on-form-change", this.onFieldChange);
    },
    // 从 Form 的 rules 属性中，获取当前 FormItem 的校验规则
    getRules() {
      let formRules = this.form.rules;
      formRules = formRules ? formRules[this.prop] : [];
      return [].concat(formRules || []);
    },

    // 重置校验数据
    resetField() {
      this.validateState = "";
      this.validateMessage = "";
      this.form.model[this.prop] = this.initialValue;
    },

    // 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
    getFiltereRule(trigger) {
      const rules = this.getRules();
      return rules.filter(
        rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1
      );
    },
    /**
     * 校验数据
     * @param trigger 校验类型
     * @param callback 回调函数
     */
    validate(trigger, callback = function() {}) {
      let rules = this.getFiltereRule(trigger);
      if (!rules || rules.length === 0) {
        return true;
      }
      // 设置状态为校验中
      this.validateState = "validating";

      // 以下为 async-validator 库的调用方法
      let description = {};
      description[this.prop] = rules;
      const validator = new AsyncValidator(description);
      let model = {};
      model[this.prop] = this.fieldValue;

      validator.validate(model, { firstFields: true }, errors => {
        this.validateState = !errors ? "success" : "error";
        this.validateMessage = errors ? errors[0].message : "";

        callback(this.validateMessage);
      });
    },
    onFieldBlur() {
      this.validate("blur");
    },
    onFieldChange() {
      this.validate("change");
    }
  }
};
</script>

<style scoped>
.i-form-item-label-required:before {
  content: "*";
  color: red;
}

.i-form-item-message {
  color: red;
}
</style>
