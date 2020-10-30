<template>
  <page :loading="status === 'loading'">
    <a-result
      v-if="status === 'error'"
      status="500"
      title="Tivemos um problema inesperado"
      sub-title="Tente novamente mais tarde."
    >
    </a-result>
    <div v-if="status === 'success'" class="listaAcoesPage">
      <div class="sub-header">
        <a-row type="flex" style="height: 100%; padding: 24px 0">
          <a-col :span="24">
            <h3>Ações</h3>
            <a-divider type="vertical" />
            {{ acoes.length }} Total
          </a-col>
        </a-row>
      </div>
      <!-- <v-drawer /> -->
      <a-row :gutter="16">
        <a-col
          v-for="acao in acoes"
          :key="acao.simbolo"
          :xs="24"
          :md="8"
          :lg="6"
          :xxl="4"
        >
          <a-card :bordered="false" @click="() => selecionarAcao(acao.simbolo)">
            <a-row type="flex" justify="center" style="height: 100%">
              <a-col :span="12"
                ><h2 class="nomeAcao">{{ acao.simbolo }}</h2></a-col
              >
              <a-col :span="12"
                ><h3 class="valorAcao">
                  {{ numeral(acao.preco).format('$ 0,0.00') }}
                </h3></a-col
              >
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <acao-drawer />
  </page>
</template>
<script>
import { onMounted, onUnmounted } from 'vue';
import numeral from 'numeral';
import { state, actions } from './handler';
import AcaoDrawer from './AcaoDrawer';

export default {
  components: {
    AcaoDrawer,
  },
  setup() {
    onMounted(async () => {
      await actions.carregar();
    });

    onUnmounted(() => {
      actions.reset();
    });

    return {
      ...state,
      ...actions,
      numeral,
    };
  },
};
</script>
<style scoped>
.sub-header h3 {
  display: inline;
}

.listaAcoesPage .ant-card {
  margin-bottom: 16px;
  box-shadow: 0 0 30px 0 rgba(82, 63, 105, 0.05);
  border: 0;
  border-radius: 0.42rem;
}

.listaAcoesPage .ant-card:hover {
  cursor: pointer;
}

.listaAcoesPage .ant-card h2 {
  margin-bottom: 0;
}

.listaAcoesPage .ant-card h3 {
  height: 100%;
  padding-top: 5px;
  margin-bottom: 0;
}

.listaAcoesPage .ant-card .nomeAcao {
  color: rgba(0, 0, 0, 0.6);
  font-weight: bold;
  letter-spacing: 1px;
}

.listaAcoesPage .ant-card .valorAcao {
  color: #52c41a;
  text-align: right;
}
</style>
