import * as api from '../../apis/acoes';
import { createState } from '../../state';

const { state, resetState, setState } = createState({
  status: null,
  acoes: [],
  acaoSelecionada: null,
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

const selecionaAcao = (simbolo) => {
  state.acaoSelecionada.value = state.acoes.value.find(
    (a) => a.simbolo === simbolo
  );
};

export const actions = {
  carregar,
  selecionaAcao,
  reset: resetState,
};

export { state };
