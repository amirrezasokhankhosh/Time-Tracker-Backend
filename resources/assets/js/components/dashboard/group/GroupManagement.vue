<template>
  <div>
    <div class="mt-10 d-flex justify-center" >
      <v-dialog v-if="form_active" v-model="form_active" persistent max-width="600px">
        <GroupForm
          :initData="initData"
          @saveForm="onSaveForm"
          @closeDialog="onCloseDialog" />
      </v-dialog>
      <v-btn  v-if="$store.getters['havePermission']('product-store')"
              color="secondary" @click="onCreateItem">
        {{$t('GROUPS.CREATE_GROUP')}}
      </v-btn>
    </div>
    <GroupList @editItem="onEditItem" />
  </div>
</template>


<script>
  import GroupList from "./GroupList";
  import GroupForm from './GroupForm' ;
  import {mapActions} from "vuex";

  export default {
    components: {GroupList , GroupForm},
    data: function() {
      return {
        form_active: false ,
        form_on_edit: false ,
        initData: {} ,
      }
    } ,
    methods: {
      ...mapActions('group' , {
        addGroup: 'add' ,
        editGroup: 'edit'
      }) ,
      onEditItem(item) {
        this.initData = item ;
        this.form_on_edit = true ;
        this.form_active = true ;
      } ,
      onCreateItem: function() {
        this.initData = {} ;
        this.form_on_edit = false ;
        this.form_active = true ;
      } ,
      onCloseDialog: function() {
        this.resetAndClose() ;
      } ,
      resetAndClose() {
        this.initData = [] ;
        this.form_on_edit = false ;
        this.form_active = false
      } ,
      onSaveForm: function(data) {
        if (this.form_on_edit === true) {
          this.editGroup({id: data.id ,data: data})
            .then(() => {
              this.resetAndClose() ;
            })
        } else {
          this.addGroup(data)
            .then(() => {
              this.resetAndClose() ;
            })
        }
      }
    }
  }

</script>
