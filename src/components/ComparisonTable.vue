<template>
  <div v-if="comparisonTable.length">
    <v-card>
      <v-card-title>Comparison</v-card-title>
      <v-card-text>
        <table>
          <thead>
            <tr>
              <th>Summary</th>
              <th>Details</th>
              <th>
                <v-select
                  :items="productOptions.map(product => product.title)"
                  label="Select Product"
                  v-model="selectedProducts[0]"
                  @input="updateComparison(0)"
                ></v-select>
              </th>
              <th>
                <v-select
                  :items="productOptions.map(product => product.title)"
                  label="Select Product"
                  v-model="selectedProducts[1]"
                  @input="updateComparison(1)"
                ></v-select>
              </th>
              <th>
                <v-select
                  :items="productOptions"
                  label="Select Product"
                  v-model="selectedProducts[2]"
                  @input="updateComparison(2)"
                ></v-select>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Image</td>
              <td><img :src="comparisonTable[0].node.images.edges[0].node.url" alt="Product Image" /></td>
              <td v-if="selectedProducts[0]"><img :src="selectedProducts[0].images.edges[0].node.url" alt="Product Image" /></td>
              <td v-if="selectedProducts[1]"><img :src="selectedProducts[1].images.edges[0].node.url" alt="Product Image" /></td>
              <td v-if="selectedProducts[2]"><img :src="selectedProducts[2].images.edges[0].node.url" alt="Product Image" /></td>
            </tr>
            <tr>
              <td>Title</td>
              <td>{{ comparisonTable[0].node.title }}</td>
              <td v-if="selectedProducts[0]">{{ selectedProducts[0].title }}</td>
              <td v-if="selectedProducts[1]">{{ selectedProducts[1].title }}</td>
              <td v-if="selectedProducts[2]">{{ selectedProducts[2].title }}</td>
              
            </tr>
            <tr>
              <td>Description</td>
              <td>{{ comparisonTable[0].node.description }}</td>
              <td v-if="selectedProducts[0]">{{ selectedProducts[0].description }}</td>
              <td v-if="selectedProducts[1]">{{ selectedProducts[1].description }}</td>
              <td v-if="selectedProducts[2]">{{ selectedProducts[2].description }}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>{{ comparisonTable[0].node.variants.edges[0].node.priceV2.amount }}</td>
              <td v-if="selectedProducts[0]">{{ selectedProducts[0].variants.edges[0].node.priceV2.amount }}</td>
              <td v-if="selectedProducts[1]">{{ selectedProducts[1].variants.edges[0].node.priceV2.amount }}</td>
              <td v-if="selectedProducts[2]">{{ selectedProducts[2].variants.edges[0].node.priceV2.amount }}</td>
            </tr>
          </tbody>
        </table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { fetchProducts2 } from '../services/Api';

export default {

  props: {
    comparisonTable: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedProducts: [null, null, null],
      productOptions: [], 
    };
  },
  methods: {
    getData(){
      fetchProducts2().then((response) => {
        this.productOptions=response.map(edge => edge.node);
      });
    },
    updateComparison(index) {
      const selectedTitle = this.selectedProducts[index];
      this.selectedProducts[index] = this.productOptions.find(product => product.title === selectedTitle);
    },
    
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
  text-align: left;
}
img {
  max-width: 100px;
  height: auto;
}
</style>