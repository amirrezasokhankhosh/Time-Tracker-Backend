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
                <v-text-field v-model="itemData.name" :label="$t('GROUPS.NAME')" required></v-text-field>
              </v-col>
              <v-col cols="12" >
                <v-text-field v-model="itemData.description" :label="$t('GROUPS.DESCRIPTION')" ></v-text-field>
              </v-col>
              <v-col v-if="$store.getters.getAllUsers.length" cols="12" >
                <v-select
                  v-model="itemData.users"
                  :items="$store.getters.getAllUsers"
                  item-text="name"
                  item-value="id"
                  :menu-props="{ maxHeight: '400' }"
                  :label="$t('GROUPS.MEMBERS')"
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
  import group_api from '@/services/api/group' ;
  import {mapActions} from "vuex";

  export default {
    data: function() {
      return {
        itemData: {
          name: '',
          description: '' ,
          users: [] ,
        } ,
        users_list: [] ,
      }
    } ,
    methods: {
      ...mapActions(['fetchAllUsers']) ,
      onCloseDialog: function() {
        this.$emit('closeDialog') ;
      } ,
      onFormSave() {
        this.$emit('saveForm' , this.itemData) ;
      } ,
    } ,
    props: ['initData'] ,
    created: function() {
      this.fetchAllUsers() ;
      // if form editing is set to true put props data in components data
      if (!this.initData.length) {
        let data_clone = JSON.parse(JSON.stringify(this.initData));
          data_clone.users = data_clone.users.map(data => data.id);
          this.itemData = data_clone ;
      }
    } ,
  }
</script>
