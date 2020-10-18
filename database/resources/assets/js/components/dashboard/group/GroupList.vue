<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="table_headers"
          :items="$store.state.group.groups"
          class="elevation-1"
        >
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
                @click="deleteGroup(item.id)"
              >
                mdi-delete
              </v-icon>
            </div>
          </template>
        </v-data-table>
        <v-pagination
          class="mt-4"
          v-model="page"
          :length="$store.state.group.pageInfo.lastPage"
        ></v-pagination>
      </v-col>
    </v-row>
  </div>
</template>

<script>

  import {mapActions} from "vuex";

  export default {

    computed: {
      page: {
        get() {
          return this.$store.state.group.pageInfo.page ;
        } ,
        set(value) {
          this.$store.commit('group/UPDATE_PAGE', value) ;
          this.fetchGroups()
        }
      }  ,
      table_headers: function() {
        let name = this.$t('GROUPS.NAME') ;
        let description = this.$t('GROUPS.DESCRIPTION') ;
        return [
          {text: name , value: 'name'} ,
          {text: description , value: 'description'} ,
          {value: 'actions'}
        ]
      }
    } ,
    methods: {
      ...mapActions('group'  , {
        fetchGroups : 'fetch' ,
        deleteGroup: 'delete'
      }) ,
      deleteItem(group) {
        this.deleteGroup(group.id)
      } ,
      editItem(item) {
        this.$emit('editItem' , item) ;
      }
    } ,
    created() {
      this.fetchGroups() ;
    }
  }
</script>
