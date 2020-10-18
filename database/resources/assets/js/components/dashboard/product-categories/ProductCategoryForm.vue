<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">Create Product</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" >
            <v-row>
              <v-col cols="12" >
                <v-text-field v-model="product_category.name" :label="$t('PRODUCT_CATEGORY.NAME')" required></v-text-field>
              </v-col>
              <v-col cols="12" >
                <v-text-field v-model="product_category.description" :label="$t('PRODUCT_CATEGORY.DESCRIPTION')" required></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="onCloseDialog">Close</v-btn>
        <v-btn color="blue darken-1" text @click="onFormSave">Save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  import product_category_api from '@/services/api/productCategory' ;
  import file_api from '@/services/api/file' ;
  import {mapActions} from "vuex";
  import ImageLoader from '@/components/common/ImageLoader' ;

  export default {
    components: {ImageLoader},
    data: function() {
      return {
        product_category: {
          name: '',
          description: '' ,
        } ,
        categories_list: [] ,
      }
    } ,
    methods: {
      ...mapActions('productCategory' , ['addProductCategory' , 'fetchProductCategories' , 'editProductCategory']) ,
      onCloseDialog: function() {
        this.$emit('closeDialog') ;
      } ,
      onFormSave() {
        if (this.form_on_edit === true) {
          this.editProductCategory({id: this.product_category.id ,data: this.product_category})
            .then(() => {
              this.$emit('closeDialog') ;
              this.fetchProductCategories();
            })
        } else {
          this.addProductCategory(this.product_category)
            .then(() => {
              this.$refs.form.reset();
              this.$emit('closeDialog');
              this.fetchProductCategories();
            })
        }
      } ,
    } ,
    props: ['form_on_edit' , 'form_edit_data'] ,

    created: function() {

      // if form editing is set to true put props data in components data
      if (this.form_on_edit === true) {
        this.product_category = JSON.parse(JSON.stringify(this.form_edit_data)) ;
      }
    } ,
  }
</script>
