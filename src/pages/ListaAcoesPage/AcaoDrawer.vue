<template>
  <a-drawer
    placement="right"
    :closable="true"
    :visible="acaoSelecionada !== null"
    width="360"
    :body-style="{ height: '100%' }"
    @close="deselecionarAcao"
  >
    <div v-if="acaoSelecionada !== null" id="listaAcoesPage-drawer">
      <a-row
        type="flex"
        justify="center"
        align="middle"
        style="height: 100%"
        v-if="acaoSelecionada.lpa <= 0"
      >
        <a-col :span="16">
          <a-result
            status="500"
            title="Prejuízo!"
            sub-title="Essa empresa teve prejuízo.. Cuidado!"
          >
          </a-result>
        </a-col>
      </a-row>
      <div v-else>
        <a-row>
          <a-col :span="12">
            <h2>{{ acaoSelecionada.simbolo }}</h2>
          </a-col>
          <a-col :span="12">
            <h3>
              {{ numeral(acaoSelecionada.preco).format('$ 0,0.00') }}
            </h3>
          </a-col>
        </a-row>

        <a-divider></a-divider>

        <a-form layout="vertical">
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item label="LPA">
                <a-input-number
                  style="width: 100%"
                  decimal-separator=","
                  :step="0.01"
                  :precision="2"
                  :value="lpa"
                  @change="(val) => (lpa = val)"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Perpétuo">
                <a-input-number
                  style="width: 100%"
                  decimal-separator=","
                  :step="0.5"
                  :precision="1"
                  :value="perpetuo"
                  :formatter="(v) => `${v}%`"
                  @change="(val) => (perpetuo = val)"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Desconto">
                <a-input-number
                  style="width: 100%"
                  decimal-separator=","
                  :step="0.5"
                  :precision="1"
                  :value="desconto"
                  :formatter="(v) => `${v}%`"
                  @change="(val) => (desconto = val)"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>

        <a-table
          :columns="colunasTabela"
          :pagination="false"
          :data-source="cenarios"
          row-key="taxaCrescimento"
        >
          <template v-slot:taxaCrescimento-coluna>
            <span><arrow-up-outlined /></span>
          </template>
          <template v-slot:percentual="{ text }">
            <span>{{ numeral(text).format('0,0.00') }}%</span>
          </template>
          <template v-slot:margem="{ text }">
            <a-tag :color="text < 0 ? 'red' : 'green'"
              >{{ numeral(text).format('0,0.00') }}%</a-tag
            >
          </template>
          <template v-slot:dinheiro="{ text }">
            <span>{{ numeral(text).format('$ 0,0.00') }}</span>
          </template>
        </a-table>
      </div>
    </div>
  </a-drawer>
</template>

<script>
import numeral from 'numeral';
import ArrowUpOutlined from '@ant-design/icons-vue/ArrowUpOutlined';
import { state, actions, computeds } from './handler';

export default {
  components: {
    ArrowUpOutlined,
  },
  setup() {
    const colunasTabela = [
      {
        dataIndex: 'taxaCrescimento',
        key: 'taxaCrescimento',
        slots: { title: 'taxaCrescimento-coluna', customRender: 'percentual' },
      },
      {
        title: 'Valor justo',
        dataIndex: 'valorIntriseco',
        key: 'valorIntriseco',
        slots: { customRender: 'dinheiro' },
      },
      {
        title: 'Margem',
        dataIndex: 'margem',
        key: 'margem',
        slots: { customRender: 'margem' },
      },
    ];

    return {
      ...state,
      ...actions,
      ...computeds,
      numeral,
      colunasTabela,
    };
  },
};
</script>
<style scoped>
#listaAcoesPage-drawer {
  height: 100%;
}

#listaAcoesPage-drawer h2 {
  font-family: 'Poppins';
  margin: 0;
  color: rgba(0, 0, 0, 0.6);
  font-weight: bold;
}
#listaAcoesPage-drawer h3 {
  font-family: 'Poppins';
  margin: 0;
  text-align: center;
  padding-top: 5px;
  color: #52c41a;
}
</style>
