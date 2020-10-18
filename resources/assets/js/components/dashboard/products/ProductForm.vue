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
                <v-text-field v-model="product.name" :label="$t('PRODUCTS.NAME')" required></v-text-field>
              </v-col>
              <v-col cols="12" >
                <v-textarea v-model="product.content" :label="$t('PRODUCTS.CONTENT')" ></v-textarea>
              </v-col>
              <v-col  cols="12" >
                <v-text-field v-model="product.code" :label="$t('PRODUCTS.CODE')" ></v-text-field>
              </v-col>
              <v-col  cols="12" >
                <v-text-field v-model="product.price" :label="$t('PRODUCTS.PRICE')" ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="product.available" :label="$t('PRODUCTS.AVAILABLE')" ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="product.max_available" :label="$t('PRODUCTS.MAX_AVAILABLE')" ></v-text-field>
              </v-col>
              <v-col>
                <ImageLoader style="width: 120px" :filename="product.image" v-if="product.image" />
                <v-file-input @change="onAddImage" accept="image/*" :label="$t('PRODUCTS.IMAGE')"></v-file-input>
              </v-col>
              <v-col cols="12" >
                <v-select
                  v-model="product.product_categories"
                  :items="categories_list"
                  item-text="name"
                  item-value="id"
                  :menu-props="{ maxHeight: '400' }"
                  :label="$t('PRODUCTS.CATEGORIES')"
                  multiple
                ></v-select>
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
        product: {
          name: '',
          content: '',
          code: '',
          available: '',
          max_available: '',
          price: '',
          image: '' ,
          product_categories: [],
        } ,
        categories_list: [] ,
      }
    } ,
    methods: {
      ...mapActions('product' , ['addProduct' , 'editProduct' , 'fetchProducts']) ,
      onCloseDialog: function() {
        this.$emit('closeDialog') ;
      } ,
      onAddImage: function(file) {
        if (file) {
          file_api.uploadFile(file)
          .then((response) => {
            let file = response.data.data
            this.product.image = file.fileName ;
          }) ;
        } else {
          this.product.image = '' ;
        }
      } ,
      onFormSave() {
        if (this.form_on_edit === true) {
          this.editProduct({id: this.product.id ,data: this.product})
          .then(() => {
            this.$emit('closeDialog') ;
            this.fetchProducts();
          })
        } else {
          this.addProduct(this.product)
            .then(() => {
              this.$refs.form.reset();
              this.$emit('closeDialog');
              this.fetchProducts();
            })
        }
      } ,
    } ,
    props: ['form_on_edit' , 'form_edit_data'] ,
    created: function() {

      // get categories list
      product_category_api.getAll()
      .then((response) => {
        this.categories_list = response.data.data ;
      })

      // if form editing is set to true put props data in components data
      if (this.form_on_edit === true) {
        this.product = JSON.parse(JSON.stringify(this.form_edit_data)) ;
        this.product.product_categories = this.product.productCategories.map((product_category) => {
          return product_category.id ;
        }) ;
      }
    } ,
  }
</script>
