<template>
  <div>
    <div class="mt-10 d-flex justify-center" >
      <v-dialog v-if="form_active" v-model="form_active" persistent max-width="600px">
        <ProductCategoryForm :form_on_edit="form_on_edit" :form_edit_data="form_edit_data" @closeDialog="form_active = false" />
      </v-dialog>
      <v-btn
        v-if="$store.getters['havePermission']('product_category-store')"
        color="secondary" @click="form_active = true">
        {{$t('PRODUCT_CATEGORY.CREATE_PRODUCT_CATEGORY')}}
      </v-btn>
    </div>
    <ProductCategoryList @editProductCategory="onEditProductCategory" class="pa-4 mt-6" />
  </div>
</template>

<script>
  import ProductCategoryList from './ProductCategoryList' ;
  import ProductCategoryForm from './ProductCategoryForm' ;

  export default {
    data: function() {
      return {
        form_active: false ,
        form_on_edit: false ,
        form_edit_data: {} ,
      }
    } ,
    components: {
      ProductCategoryForm,
      ProductCategoryList
    } ,
    methods: {
      onEditProductCategory: function(item) {
        this.form_edit_data = item ;
        this.form_on_edit = true ;
        this.form_active = true ;
      }
    }
  }
</script>
