<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-row class="ma-5">
      <v-col cols="12">
        <div class="ma-10" style="text-align: center">
          <v-btn
            v-if="$store.getters['havePermission']('user-store')"
            color="success"
            class="mb-2"
            @click="newItem"
          >
            {{ $t("USERS.ADD_USER") }}
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
            <template v-slot:item.action="{ item }">
              <v-icon
                v-if="$store.getters['havePermission']('user-update_roles')"
                color="success"
                small
                class="mr-2"
                @click="editRolepermissions(item)"
              >
                mdi-folder-lock
              </v-icon>
              <v-icon
                v-if="$store.getters['havePermission']('user-update')"
                color="primary"
                small
                class="mr-2"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                v-if="$store.getters['havePermission']('user-delete')"
                color="danger"
                small
                class="mr-2"
                @click="deleteItem(item)"
              >
                mdi-delete
              </v-icon>
              <v-icon
                color="primary"
                small
                class="mr-2"
                @click="onEditGroup(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                color="primary"
                small
                class="mr-2"
                @click="onEditProjects(item)"
              >
                mdi-pencil
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="getUsers">Reset</v-btn>
            </template>
          </v-data-table>

          <v-dialog
            v-if="editGroupDialog"
            v-model="editGroupDialog"
            persistent max-width="600px"
          >
            <EditGroups
              @closeDialog="editGroupDialog = false"
              :user="selectedUser" />
          </v-dialog>

          <v-dialog
            v-if="editProjectDialog"
            v-model="editProjectDialog"
            persistent max-width="600px"
          >
            <EditProjects
              :user="selectedUser"
              @closeDialog="editProjectsDialog = false" />
          </v-dialog>

          <!--edit permission dialog start here-->
          <v-dialog v-model="editUserRolesDialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Edit permissions</span>
              </v-card-title>

              <v-list shaped>
                <v-list-item-group v-model="RolesModel" multiple>
                  <template v-for="(role, R) in roles">
                    <v-list-item
                      :key="`role-${R}`"
                      :value="role"
                      active-class="primary--text text--accent-4"
                    >
                      <template v-slot:default="{ active, toggle }">
                        <v-list-item-content>
                          <v-list-item-title v-text="role"></v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-checkbox
                            :input-value="active"
                            :true-value="role"
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
                <v-btn color="blue darken-1" text @click="close">{{
                  $t("USERS.CANCEL")
                }}</v-btn>
                <v-btn color="blue darken-1" text @click="updateUserRoles">{{
                  $t("USERS.SAVE")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--edit permisson dialog ends here-->

          <!--edit User dialog start here-->
          <v-dialog v-model="editDialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        outlined
                        v-model="editingItem.username"
                        :label="$t('USERS.USER_NAME')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        outlined
                        v-model="editingItem.name"
                        :label="$t('USERS.NAME')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        outlined
                        v-model="editingItem.email"
                        :label="$t('USERS.EMAIL')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        outlined
                        v-model="editingItem.phone_number"
                        :label="$t('USERS.PHONE_NUMBER')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        outlined
                        v-model="editingItem.national_code"
                        :label="$t('USERS.NATIONAL_CODE')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        outlined
                        v-model="editingItem.password"
                        type="password"
                        :label="$t('USERS.PASSWORD')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        outlined
                        v-model="editingItem.password_confirmation"
                        type="password"
                        :label="$t('USERS.PASSWORD_CONFIRMATION')"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">{{
                  $t("USERS.CANCEL")
                }}</v-btn>
                <v-btn color="blue darken-1" text @click="saveItem">{{
                  $t("USERS.SAVE")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!--edit User dialog ends here-->

          <!--delete dialog start here-->

          <v-dialog v-model="deleteDialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ $t("USERS.DELETE") }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="8">
                      Are you sure to delete
                      <span class="subtitle-1	red--text">{{
                        deleteItemName
                      }}</span>
                      user
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDeleteDialog"
                  >{{ $t("USERS.CANCEL") }}
                </v-btn>
                <v-btn color="blue darken-1" text @click="deleteUser">{{
                  $t("USERS.DELETE")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!--delete dialog ends here-->

          <!--pagination start here-->

          <v-divider class="mb-5"></v-divider>
          <div class="d-flex justify-end">
            <v-col cols="12" md="2">
              <v-pagination
                :length="pageCount"
                v-model="page"
                circle
                :total-visible="5"
              ></v-pagination>
            </v-col>
          </div>

          <!--pagination end here-->
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import EditGroups from './EditGroups' ;
import EditProjects from './EditProjects' ;

export default {
  data: () => ({
    dialog: false,
    editDialog: false,
    isEditingItem: false,
    deleteDialog: false,
    deleteItemName: "",
    deleteIndex: {},
    defaultItem: {
      bio: "",
      created_at: "",
      email: "",
      id: null,
      name: "",
      national_code: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
      updated_at: "",
      username: ""
    },
    loadingDataTable: true,
    page: 1,
    itemPrePage: 10,
    editingItem: {
      bio: "",
      created_at: "",
      email: "",
      id: null,
      name: "",
      national_code: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
      updated_at: "",
      username: ""
    },
    roles: [],
    Roleobjects: [],
    editUserRolesDialog: false,
    RolesModel: [],
    Rolesbelong: [],
    UpdateRoleID: null,
    RoleIDSOBJ: [],
    RoleIDS: [] ,
    editGroupDialog: false ,
    editProjectDialog: false ,

    // Group
    selectedUser: null ,

  }),
  components: {
    EditProjects,
    EditGroups
  },
  computed: {
    formTitle() {
      return this.isEditingItem
        ? this.$t("USERS.EDIT_USER")
        : this.$t("USERS.NEW_USER");
    },
    headers() {
      let userNameText = this.$t("USERS.USER_NAME");
      let idText = this.$t("USERS.ID");
      let nameText = this.$t("USERS.NAME");
      let emailText = this.$t("USERS.EMAIL");
      let phoneNumberText = this.$t("USERS.PHONE_NUMBER");
      let nationalCodeText = this.$t("USERS.NATIONAL_CODE");
      return [
        {
          text: userNameText,
          align: "left",
          value: "username"
        },
        { text: idText, value: "id", sortable: false },
        { text: nameText, value: "name" },
        { text: emailText, value: "email" },
        { text: phoneNumberText, value: "phone_number" },
        { text: nationalCodeText, value: "national_code" },
        { text: "", value: "action", sortable: false }
      ];
    },
    members() {
      return this.$store.getters.getUser;
    },
    pageCount() {
      return this.$store.getters.getUserPageCount;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    editUserRolesDialog(val) {
      val || this.close();
    }
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    ...mapActions([
      "getUserFunction",
      "postUserFunction",
      "editUserFunction",
      "deleteUserFunction",
      "getUserRolesFunction",
      "UpdateUserRolesFunction"
    ]),
    async getUsers() {
      this.loadingDataTable = true;
      await this.getUserFunction(this.page);
      this.loadingDataTable = false;
    },
    async editRolepermissions(item) {
      this.UpdateRoleID = item.id;
      this.editUserRolesDialog = true;
      this.RolesModel = [];
      await this.getUserRolesFunction(item.id);
      this.Roleobjects = this.$store.getters.getUserRole;
      this.roles = this.$store.getters.getUserRole.map(function(a) {
        return a["name"];
      });
      this.Rolesbelong = this.$store.getters.getUserRole.map(function(a) {
        return a["belong_to_user"];
      });
      for (var i = 0; i <= this.Rolesbelong.length; i++) {
        if (this.Rolesbelong[i]) {
          this.RolesModel.push(this.roles[i]);
        } else {
          var check = this.RolesModel.includes(this.roles[i]);
          if (check) {
            var index = this.RolesModel.indexOf(this.roles[i]);
            this.RolesModel.splice(index, 1);
          }
        }
      }
    },
    updateUserRoles() {
      console.log(this.RolesModel);
      this.RoleIDSOBJ = [];
      this.RoleIDS = [];
      for (let i = 0; i < this.RolesModel.length; i++) {
        this.RoleIDS.push(
          this.Roleobjects.find(a => a.name === this.RolesModel[i]).id
        );
        console.log(this.RoleIDS);
      }
      this.UpdateUserRolesFunction({
        id: this.UpdateRoleID,
        roles: this.RoleIDS
      });
    },
    editItem(item) {
      this.editingItem = item;
      this.editDialog = true;
      this.isEditingItem = true;
    },
    deleteItem(item) {
      this.deleteIndex = item;
      this.deleteItemName = item.name;
      this.deleteDialog = true;
    },
    onEditGroup(item) {
      this.selectedUser = item ;
      this.editGroupDialog = true ;
    } ,
    onEditProjects(item) {
      this.selectedUser = item ;
      this.editProjectDialog = true ;
    } ,
    close() {
      this.editUserRolesDialog = false;
      this.editDialog = false;
      setTimeout(() => {
        this.editingItem = Object.assign({}, this.defaultItem);
      }, 300);
    },

    async saveItem() {
      if (this.isEditingItem) {
        await this.editUserFunction({
          id: this.editingItem.id,
          username: this.editingItem.username,
          name: this.editingItem.name,
          password: this.editingItem.password,
          email: this.editingItem.email,
          phone_number: this.editingItem.phone_number,
          password_confirmation: this.editingItem.password_confirmation,
          national_code: this.editingItem.national_code,
          active: this.editingItem.active
        });
      } else {
        await this.postUserFunction({
          username: this.editingItem.username,
          name: this.editingItem.name,
          password: this.editingItem.password,
          email: this.editingItem.email,
          phone_number: this.editingItem.phone_number,
          password_confirmation: this.editingItem.password_confirmation,
          national_code: this.editingItem.national_code,
          active: this.editingItem.active
        });
      }
      await this.getUserFunction(this.page);
      this.close();
    },

    newItem() {
      this.editingItem = Object.assign({}, this.defaultItem);
      this.editDialog = true;
      this.isEditingItem = false;
    },

    closeDeleteDialog() {
      this.deleteDialog = false;
    },

    async deleteUser() {
      if (this.deleteIndex.id > 2) {
        await this.deleteUserFunction(this.deleteIndex.id);
        await this.getUserFunction(this.page);
      }
      this.closeDeleteDialog();
    }
  }
};
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
