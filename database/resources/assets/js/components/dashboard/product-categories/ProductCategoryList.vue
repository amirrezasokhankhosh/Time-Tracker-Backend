<template>
  <div>
    <div>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="table_headers"
            :items="product_categories_list"
            class="elevation-1"
          >
            <template v-slot:item.productCategories="{item}">
              <v-chip class="mx-2 my-1" v-for="(product_category , index) in item.productCategories"  :key="index" >
                {{product_category.name}}
              </v-chip>
            </template>
            <template v-slot:item.actions="{item}">
              <div class="d-flex">
                <v-icon
                  v-if="$store.getters['havePermission']('product_category-update')"
                  color="primary"
                  small
                  class="mr-2"
                  @click="editItem(item)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  v-if="$store.getters['havePermission']('product_category-delete')"
                  color="danger"
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
  </div>
</template>

<script>

  import {mapActions} from 'vuex' ;

  export default {
    data: function() {
      return {
      }
    } ,
    methods: {
      ...mapActions('productCategory' , ['fetchProductCategories' , 'deleteProductCategory']),
      deleteItem(product) {
        this.deleteProductCategory(product.id) ;
        this.fetchProductCategories() ;
      } ,
      editItem(item) {
        this.$emit('editProductCategory' , item) ;
      } ,
    } ,
    created() {
      this.fetchProductCategories() ;
    } ,
    watch: {
      page: function(page) {
        this.$store.commit('productCategory/UPDATE_PAGE' , page)
        this.fetchProductCategories() ;
      }
    } ,
    computed: {
      product_categories_list: function() {
        return this.$store.getters['productCategory/getList'] ;
      } ,
      page: {
        get() {
          return this.$store.getters['productCategory/getPageInfo'].page ;
        } ,
        set(value) {
          this.$store.commit('productCategory/UPDATE_PAGE', value)
        }
      }  ,
      lastPage: function() {
        return this.$store.getters['productCategory/getPageInfo'].lastPage ;
      } ,
      table_headers: function() {
        let name = this.$t('PRODUCT_CATEGORY.NAME') ;
        let description =  this.$t('PRODUCT_CATEGORY.DESCRIPTION') ;
        return [
          {text: name , value: 'name'} ,
          {text: description , value: 'description'} ,
          {value: 'actions'}
        ]
      }
    }
  }
</script>
