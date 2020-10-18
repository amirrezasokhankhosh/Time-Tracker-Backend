<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="table_headers"
          :items="products_list"
          class="elevation-1"
        >
          <template v-slot:item.image="{item}">
            <ImageLoader :key="item.image"  class="product_image" :filename="item.image" />
          </template>
          <template v-slot:item.productCategories="{item}">
            <v-chip class="mx-2 my-1" v-for="(product_category , index) in item.productCategories"  :key="index" >
              {{product_category.name}}
            </v-chip>
          </template>
          <template v-slot:item.actions="{item}">
            <div class="d-flex">
              <v-icon
                v-if="$store.getters['havePermission']('product-update')"
                color="primary"
                small
                class="mr-2"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                color="danger"
                v-if="$store.getters['havePermission']('product-delete')"
                small
                class="mr-2"
                @click="deleteItem(item)"
              >
                mdi-delete
              </v-icon>
            </div>
          </template>
        </v-data-table>
        <v-pagination
          class="mt-4"
          v-model="page"
          :length="lastPage"
        ></v-pagination>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import ImageLoader from '@/components/common/ImageLoader' ;
  import {mapActions} from 'vuex' ;

  export default {
    data: function() {
      return {
      }
    } ,
    components: {ImageLoader} ,
    methods: {
      ...mapActions('product' , ['fetchProducts' , 'deleteProduct']),
      getProducts() {
        this.fetchProducts()
      } ,
      editItem(item) {
        this.$emit('editProduct' , item) ;
      } ,
      deleteItem(product) {
        this.deleteProduct(product.id) ;
        this.fetchProducts()
      } ,
    } ,
    created() {
      this.getProducts() ;
    } ,
    watch: {
      page: function(page) {
        this.$store.commit('product/UPDATE_PAGE' , page)
        this.getProducts() ;
      }
    } ,
    computed: {
      products_list: function() {
        return this.$store.getters['product/getList'] ;
      } ,
      page: {
        get() {
          return this.$store.getters['product/getPageInfo'].page ;
        } ,
        set(value) {
          this.$store.commit('product/UPDATE_PAGE', value)
        }
      }  ,
      lastPage: function() {
        return this.$store.getters['product/getPageInfo'].lastPage ;
      } ,
      table_headers: function() {
        let name = this.$t('PRODUCTS.NAME') ;
        let content = this.$t('PRODUCTS.CONTENT') ;
        let image = this.$t('PRODUCTS.IMAGE') ;
        let code = this.$t('PRODUCTS.CODE') ;
        let available = this.$t('PRODUCTS.AVAILABLE') ;
        let max_available = this.$t('PRODUCTS.MAX_AVAILABLE') ;
        let price = this.$t('PRODUCTS.PRICE') ;
        let categories = this.$t('PRODUCTS.CATEGORIES') ;
        return [
          {text: image , value: 'image'} ,
          {text: name , value: 'name'} ,
          {text: content, value: 'content'} ,
          {text: code , value: 'code'} ,
          {text: available , value: 'available'} ,
          {text: max_available , value: 'max_available'} ,
          {text: price , value: 'price'} ,
          {text: categories , value: 'productCategories'} ,
          {value: 'actions'}
        ]
      }
    }
  }
</script>

<style>
  .product_image {
    width: 150px ;
    padding: 10px ;
  }
</style>
