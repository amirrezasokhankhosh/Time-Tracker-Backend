<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">Edit Group</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" >
            <v-row>
              <v-col cols="12" >
                <v-checkbox
                  v-for="group in allGroups"
                  :key="group.id"
                  v-model="selected"
                  :label="group.name"
                  :value="group.id"
                >
                </v-checkbox>
              </v-col>
              <v-col cols="12" >
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
  import {mapActions , mapGetters} from "vuex";

  export default {
    data: function() {
      return {
        selected: [] ,
      }
    } ,
    computed: {
      ...mapGetters({
        allGroups: 'group/getAll'
      }) ,
    } ,
    methods: {
      ...mapActions('group' , {
        fetchAllGroups: 'fetchAll' ,
      }) ,
      ...mapActions(['updateUsersGroups']) ,
      onCloseDialog: function() {
        this.$emit('closeDialog') ;
      } ,
      onFormSave() {
        this.updateUsersGroups({user_id: this.user.id ,groups: this.selected})
        .then(() => {
          this.$emit('closeDialog') ;
        })
      } ,
    } ,
    props: {
      'user': Object ,
    } ,
    created: function() {
      this.fetchAllGroups()
      .then(() => {
        // put users groups is state
        this.selected = this.user.groups.map(group => group.id) ;
      }) ;

    } ,
  }
</script>
