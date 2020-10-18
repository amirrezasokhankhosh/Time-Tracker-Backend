<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">Edit Projects</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" >
            <v-row>
              <v-col cols="12" >
                <v-checkbox
                  v-for="project in allProjects"
                  :key="project.id"
                  v-model="selected"
                  :label="project.name"
                  :value="project.id"
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
        allProjects: 'project/getAll'
      }) ,
    } ,
    methods: {
      ...mapActions('project' , {
        fetchAllProjects: 'fetchAll' ,
      }) ,
      ...mapActions(['updateUsersProjects']) ,
      onCloseDialog: function() {
        this.$emit('closeDialog') ;
      } ,
      onFormSave() {
        console.log(this.user.id) ;
        this.updateUsersProjects({user_id: this.user.id ,projects: this.selected})
          .then(() => {
            this.$emit('closeDialog') ;
          })
      } ,
    } ,
    props: {
      'user': Object ,
    } ,
    created: function() {
      this.fetchAllProjects()
        .then(() => {
          // put users groups is state
          this.selected = this.user.projects.map(project => project.id) ;
        }) ;

    } ,
  }
</script>
