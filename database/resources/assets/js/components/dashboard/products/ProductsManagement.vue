<template>
  <div>
    <div class="mt-10 d-flex justify-center" >
      <v-dialog v-if="form_active" v-model="form_active" persistent max-width="600px">
        <ProductForm :form_on_edit="form_on_edit"
                     :form_edit_data="form_edit_data"
                     @closeDialog="form_active = false" />
      </v-dialog>
      <v-btn  v-if="$store.getters['havePermission']('product-store')"
              color="secondary" @click="onCreateProductClick">
        {{$t('PRODUCTS.CREATE_PRODUCT')}}
      </v-btn>
    </div>
    <ProductsList @editProduct="onEditProduct" class="pa-4 mt-6" />
  </div>
</template>

<script>
  import ProductsList from './ProductsList' ;
  import ProductForm from './ProductForm' ;

  export default {
    data: function() {
      return {
        form_active: false ,
        form_on_edit: false ,
        form_edit_data: {} ,
      }
    } ,
    components: {
      ProductsList ,
      ProductForm
    } ,
    methods: {
      onEditProduct: function(item) {
        this.form_edit_data = item ;
        this.form_on_edit = true ;
        this.form_active = true ;
      } ,
      onCreateProductClick: function() {
        this.form_edit_data = {} ;
        this.form_on_edit = false ;
        this.form_active = true ;
      }
    }
  }
</script>
