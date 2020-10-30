import { computed } from 'vue';
import * as api from '../../apis/acoes';
import { createState } from '../../state';

const { state, resetState, setState } = createState({
  status: null,
  acoes: [],
  acaoSelecionada: null,
  lpa: null,
  perpetuo: 2.0,
  desconto: 15.0,
});

const obterValorIntriseco = (
  currentValue,
  growthRate,
  discountRate,
  perpetualRate,
  totalYearsProjection
) => {
  let lastValue = currentValue;
  let result = 0;
  for (let i = 0; i < totalYearsProjection; i += 1) {
    const t = lastValue * (1 + growthRate);
    const b = (1 + discountRate) ** (i + 1);
    result += t / b;
    lastValue = t;
  }

  const tv = (lastValue * (1 + perpetualRate)) / (discountRate - perpetualRate);
  result += tv / (1 + discountRate) ** totalYearsProjection;
  return result;
};

const obterCenarios = (acao) => {
  return [...Array(20).keys()].reverse().map((taxa) => {
    const taxaCrescimento = (taxa + 1) / 100.0;
    const valorIntriseco = obterValorIntriseco(
      state.lpa.value,
      taxaCrescimento,
      state.desconto.value / 100.0,
      state.perpetuo.value / 100.0,
      10
    );
    const margem = valorIntriseco / acao.preco - 1.0;
    return {
      taxaCrescimento: taxaCrescimento * 100.0,
      valorIntriseco,
      margem: margem * 100.0,
    };
  });
};

const cenarios = computed(() => {
  if (state.acaoSelecionada.value == null) {
    return null;
  }
  return obterCenarios(state.acaoSelecionada.value);
});

const carregar = async () => {
  state.status.value = 'loading';
  try {
    const response = await api.obterAcoes();
    setState(response);
    state.status.value = 'success';
  } catch (e) {
    state.status.value = 'error';
  }
};

const selecionarAcao = (simbolo) => {
  state.acaoSelecionada.value = state.acoes.value.find(
    (a) => a.simbolo === simbolo
  );
  state.lpa.value = state.acaoSelecionada.value.lpa;
};

const deselecionarAcao = () => {
  state.acaoSelecionada.value = null;
  state.lpa.value = null;
};

export const actions = {
  carregar,
  selecionarAcao,
  deselecionarAcao,
  reset: resetState,
};

export { state };

export const computeds = {
  cenarios,
};
