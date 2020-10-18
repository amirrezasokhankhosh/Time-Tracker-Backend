<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-row class="ma-5">
      <v-col cols="12">

        <div class="ma-10" style="text-align: center">
          <v-btn  v-if="$store.getters['havePermission']('role-store')"
                  color="success"
                  class="mb-2"
                  @click="newItem">
            {{ $t('Roles.ADD_ROLE') }}
          </v-btn>

        </div>

        <v-card>

          <v-data-table

            :headers="headers"
            :items="members"
            sort-by="id"
            :items-per-page="itemPrePage"
            :page.sync="page"
            hide-default-footer
          >
            <template v-slot:top>


            </template>
            <template v-slot:item.action="{ item }">
               <v-icon
               v-if="$store.getters['havePermission']('role-update_permissions')"
                color="warning"
                small
                class="mr-2"
                @click=" getPermissions(item)"
              >
              mdi-lock
              </v-icon>
              <v-icon
                v-if="$store.getters['havePermission']('role-update')"
                color="primary"
                small
                class="mr-2"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                v-if="$store.getters['havePermission']('role-delete')"
                color="danger"
                small
                class="mr-2"
                @click="deleteItem(item)"
              >
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="getRoles" >Reset</v-btn>
            </template>
          </v-data-table>

      <!--edit permission dialog start here-->
          <v-dialog v-model="editpermissonDialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Edit permissions</span>
              </v-card-title>

              <v-list shaped>
        <v-list-item-group
         v-model="permissionModel"
          multiple
        >
        <template v-if="showbtn">
              <v-btn color="primary" >Reset</v-btn>
            </template>
          <template v-for="(permissionname, p) in permissionnames">
            <v-list-item

              :key="`permissionname-${p}`"
              :value="permissionname"
              active-class="primary--text text--accent-4"
            >
              <template v-slot:default="{ active, toggle }">
                <v-list-item-content>
                  <v-list-item-title v-text="permissionname"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-checkbox
                    :input-value="active"
                    :true-value="permissionname"
                    color="primary accent-4"
                    @click="toggle"
                  ></v-checkbox>
                </v-list-item-action>
              </template>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">{{ $t('USERS.CANCEL') }}</v-btn>
                <v-btn color="blue darken-1" text @click="UpdatePermissions">{{ $t('USERS.SAVE') }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--edit permisson dialog ends here-->

          <!--edit role dialog start here-->

          <v-dialog v-model="editDialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field outlined v-model="editingItem.name"
                                    :label="$t('Roles.NAME')"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field outlined v-model="editingItem.slug"
                                    :label="$t('Roles.SLUG')"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field outlined v-model="editingItem.description"
                                     :label="$t('Roles.DESCRIPTION')"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">{{ $t('USERS.CANCEL') }}</v-btn>
                <v-btn color="blue darken-1" text @click="saveItem">{{ $t('USERS.SAVE') }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!--edit role dialog ends here-->


          <!--delete dialog start here-->

          <v-dialog v-model="deleteDialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ $t('USERS.DELETE') }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="8">
                      Are you sure to delete <span class="subtitle-1	red--text">{{ deleteItemName }}</span> user
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDeleteDialog">{{ $t('USERS.CANCEL') }}
                </v-btn>
                <v-btn color="blue darken-1" text @click="deleteRole">{{ $t('USERS.DELETE') }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!--delete dialog ends here-->

          <!--pagination start here-->

          <v-divider class="mb-5"></v-divider>
          <div class="d-flex justify-end">
            <v-col cols="12" md="2">
              <v-pagination :length="pageCount" v-model="page" circle :total-visible="5"></v-pagination>
            </v-col>
          </div>

          <!--pagination end here-->

        </v-card>


      </v-col>
    </v-row>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    data: () => ({
      dialog: false,
      editDialog: false,
      editpermissonDialog:false,
      isEditingItem: false,
      deleteDialog: false,
      showbtn:false,
      hasPermission:[],
      permissionID:[],
      updatepermitemid:null,
      deleteItemName: "",
      deleteIndex: {},
      gotvalue:{},
      defaultItem: {
        name: '',
        slug: '',
        updated_at: "",
        created_at: "",
        id: null,
        description:'',

      },
      loadingDataTable: true,
      page: 1,
      itemPrePage: 25,
      editingItem:{
         id: null,
        description: '',
        name: "",
        slug: "",
      },
       permissionsinfo:[],
       permissionnames:[],
       permissionModel:[],
       modelid:[],
       search:[]
    }),

    computed: {

      formTitle() {
        return this.isEditingItem ? this.$t('Roles.ADD_ROLE') : this.$t('Roles.ADD_ROLE')
      },
      headers() {
        let idText = this.$t('Roles.ID');
        let NameText = this.$t('Roles.NAME');
        let slugText = this.$t('Roles.SLUG');
        let describeText = this.$t('Roles.DESCRIPTION');
        return [
          {text: idText, value: 'id', sortable: false,align: 'left'},
          {
          text: NameText,
          value: 'name',
        },
          {text: slugText, value: 'slug'},
          {text: describeText, value:'description'},
          {text: '', value: 'action', sortable: false}];
      },
      members() {
        return this.$store.getters.getRole
      },
      pageCount() {
        return this.$store.getters.getRolePageCount
      }
    },

    watch: {
      dialog(val) {
        val || this.close()
      },
       editpermissonDialog(val) {
        val || this.close()
      },
    },
    mounted() {
      this.getRoles();
    },
    methods: {
      ...mapActions(['getRoleFunction', 'postRoleFunction', 'editRoleFunction', 'deleteRoleFunction','getPermissionFunction','editPermissionFunction']),
      async getRoles() {
        this.loadingDataTable = true;
        await this.getRoleFunction(this.page);
        this.loadingDataTable = false;
      },
       async getPermissions(item) {
         this.editpermissonDialog = true
         this.updatepermitemid = item.id
        await this.getPermissionFunction(item.id);
        this.permissionsinfo = this.$store.getters.getPermission
        this.permissionnames = this.$store.getters.getPermissionnames
        this.permissionModel = this.$store.getters.getPermissionModel
      },
      UpdatePermissions(){
        var i ;
        this.modelid = []
       for(i = 0 ; i <= this.permissionModel.length;i++){
            var found = this.permissionsinfo.findIndex(perm => {return perm.name === this.permissionModel[i]})
            this.modelid.push(found+1)
            }
            this.modelid.pop()
           console.log(this.modelid)
         this.editPermissionFunction({
          id:this.updatepermitemid,
          permissions:this.modelid
         })
      },

      deleteItem(item) {
        this.deleteIndex = item;
        this.deleteItemName = item.name;
        this.deleteDialog = true;
      },

      close() {
        this.permissionModel = []
        this.permissionID=[]
        this.editDialog = false
        this.editpermissonDialog = false
        setTimeout(() => {
          this.editingItem = Object.assign({}, this.defaultItem)
        }, 300)
      },
editItem(item) {
        this.editingItem = item
        this.editDialog = true
        this.isEditingItem = true
      },
      async saveItem() {
        if(this.isEditingItem){
          await this.editRoleFunction({
            id: this.editingItem.id,
            name: this.editingItem.name,
            slug: this.editingItem.slug,
            description: this.editingItem.description,
          })
        }else {
          await this.postRoleFunction({
            name: this.editingItem.name,
            slug: this.editingItem.slug,
           description: this.editingItem.description,
          })
        }
        await this.getRoleFunction(this.page);
        this.close();
      },

      newItem() {
        this.editingItem = Object.assign({},this.defaultItem)
        this.editDialog = true
        this.isEditingItem = false
      },

      closeDeleteDialog() {
        this.deleteDialog = false
      },
      async deleteRole() {
        if (this.deleteIndex.id > 1) {
          await this.deleteRoleFunction(this.deleteIndex.id)
          await this.getRoleFunction(this.page);
        }
        this.closeDeleteDialog();
      },
    }
  }
</script>

<style>
  .v-application--is-rtl .text-left {
    text-align: right !important;
    /*padding-top: 5px;*/
    /*padding-bottom: 5px;*/
    /*padding-left:  70px;*/
  }

  /*th{*/
  /*padding-top: 5px;*/
  /*padding-bottom: 5px;*/
  /*padding-left:  70px;*/
  /*}*/
</style>
