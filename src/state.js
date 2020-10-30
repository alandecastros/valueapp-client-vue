import { ref } from 'vue';

const copyValue = (val) => {
  if (val === null || val === undefined) {
    return val;
  }
  if (typeof val === 'object') {
    return JSON.parse(JSON.stringify(val));
  }
  return val;
};

export const createState = (stateDef) => {
  const state = {};
  Object.keys(stateDef).forEach((k) => {
    state[k] = ref(copyValue(stateDef[k]));
  });

  const resetState = () => {
    Object.keys(stateDef).forEach((k) => {
      state[k].value = copyValue(stateDef[k]);
    });
  };

  const setState = (data) => {
    Object.keys(stateDef).forEach((k) => {
      if (typeof data[k] !== 'undefined') {
        state[k].value = data[k];
      }
    });
  };

  const stateValues = () => {
    const o = {};
    Object.keys(stateDef).forEach((k) => {
      o[k] = state[k].value;
    });
    return o;
  };

  return { state, resetState, setState, stateValues };
};
