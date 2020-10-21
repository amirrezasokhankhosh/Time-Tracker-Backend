'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Logger = use('Logger');

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

const addPrefixToGroup = (group) => {
  group.prefix('/api')
  return group;
}

Route.get('/ttt', () => {
  return 'ok';
});

//Auth routes
addPrefixToGroup(Route.group(() => {
  Route.post('/signup', 'AuthController.signup');
  Route.post('/login', 'AuthController.login');
  Route.post('/send_token_for_password_less_login', 'AuthController.sendTokenForPasswordLessLogin');
  Route.post('/password_less_login', 'AuthController.passwordLessLogin');
})
  .prefix('/auth')
);

addPrefixToGroup(Route.group(() => {



  // ____ role and permissions
  Route.get('/currentPermissions', 'UserController.currentPermissions')
    .middleware(['can:user-current_permissions']);

  Route.get('/:id/roles', 'UserController.roles')
    .middleware(['can:role-view']);

  Route.put('/:id/updateRoles', 'UserController.updateRoles')
    .middleware(['can:user-update_roles']);


  // __________ groups
  Route.get('/:id/group', 'UserController.getGroups');
  Route.put('/:id/group', 'UserController.updateGroups');


  // _______ projects
  Route.get('/:id/project', 'UserController.getProjects');
  Route.put('/:id/project', 'UserController.updateProjects');

  // ___ Crud
  Route.get('/', 'UserController.index')
    .middleware(['can:user-view']);

  Route.get('/:id', 'UserController.show')
    .middleware(['can:user-view']);

  Route.post('/', 'UserController.store')
    .middleware(['can:user-store']);

  Route.put('/:id', 'UserController.update')
    .middleware(['can:user-update']);

  Route.delete('/:id', 'UserController.destroy')
    .middleware(['can:user-delete']);
  // _____


})
  .prefix('user')
  .middleware(['auth'])
);



//account routes
addPrefixToGroup(Route.group(() => {
  Route.get('/profile', 'ProfileController.getProfile');
  Route.put('/update_profile', 'ProfileController.updateProfile');
  Route.put('/change_password', 'ProfileController.changePassword');

})
  .prefix('account')
  .middleware(['auth'])
);


addPrefixToGroup(Route.group(() => {

  //permissions CRUD
  Route.get('/', 'PermissionController.index')
    .middleware(['can:permission-view']);

  Route.get('/:id', 'PermissionController.show')
    .middleware(['can:permission-view']);


  Route.post('/', 'PermissionController.store')
    .middleware(['can:permission-store']);

  Route.put('/:id', 'PermissionController.update')
    .middleware(['can:permission-update']);

  Route.delete('/:id', 'PermissionController.destroy')
    .middleware(['can:permission-delete']);

}).prefix('permission')
  .middleware(['auth'])
);

addPrefixToGroup(Route.group(() => {

  //role CRUD
  Route.get('/', 'RoleController.index')
    .middleware(['can:role-view']);

  Route.post('/', 'RoleController.store')
    .middleware(['can:role-store']);

  Route.get('/:id', 'RoleController.show')
    .middleware(['can:role-view']);

  Route.put('/:id', 'RoleController.update')
    .middleware(['can:role-update']);

  Route.delete('/:id', 'RoleController.destroy')
    .middleware(['can:role-delete']);


  Route.get('/:id/permissions/', 'RoleController.permissions')
    .middleware(['can:role-view']);

  Route.put('/:id/updatePermissions', 'RoleController.updatePermissions')
    .middleware(['can:role-update_permissions']);

}).prefix('role')
  .middleware(['auth'])
);



addPrefixToGroup(Route.group(() => {

  // product CRUD
  Route.get('/', 'ProductController.index')
    .middleware(['can:product-view']);

  Route.get('/:id', 'ProductController.show')
    .middleware(['can:product-view']);

  Route.post('/', 'ProductController.store')
    .middleware(['can:product-store']);

  Route.put('/:id', 'ProductController.update')
    .middleware(['can:product-update']);

  Route.delete('/:id', 'ProductController.destroy')
    .middleware(['can:product-delete']);

}).prefix('product')
  .middleware(['auth'])
);


addPrefixToGroup(Route.group(() => {

  // product CRUD
  Route.get('/', 'ProjectController.index')

  Route.get('/:id', 'ProjectController.show')

  Route.post('/', 'ProjectController.store')

  Route.put('/:id', 'ProjectController.update')

  Route.delete('/:id', 'ProjectController.destroy')

}).prefix('project')
  .middleware(['auth'])
);


addPrefixToGroup(Route.group(() => {

  // product CRUD
  Route.get('/', 'TaskController.index')

  Route.get('/:id', 'TaskController.show')

  Route.post('/', 'TaskController.store')

  Route.put('/:id', 'TaskController.update')

  Route.delete('/:id', 'TaskController.destroy')

}).prefix('task')
  .middleware(['auth'])
);



addPrefixToGroup(Route.group(() => {

  Route.get('/:id/user', 'GroupController.getUsers')

  // product CRUD
  Route.get('/', 'GroupController.index')

  Route.get('/:id', 'GroupController.show')

  Route.post('/', 'GroupController.store')

  Route.put('/:id', 'GroupController.update')

  Route.delete('/:id', 'GroupController.destroy')


}).prefix('group')
  .middleware(['auth'])
);


addPrefixToGroup(Route.group(() => {

  // product CRUD
  Route.get('/', 'ProductCategoryController.index')
    .middleware(['can:product_category-view']);

  Route.post('/', 'ProductCategoryController.store')
    .middleware(['can:product_category-store']);

  Route.get('/:id', 'ProductCategoryController.show')
    .middleware(['can:product_category-view']);

  Route.put('/:id', 'ProductCategoryController.update')
    .middleware(['can:product_category-update']);

  Route.delete('/:id', 'ProductCategoryController.destroy')
    .middleware(['can:product_category-delete']);

}).prefix('productCategory')
  .middleware(['auth'])
);


addPrefixToGroup(Route.group(() => {

  // Route group for file upload/download handling

  Route.get('/:filename', 'FileController.retrieve')
    .middleware(['can:file-view']);

  Route.post('/', 'FileController.store')
    .middleware(['can:file-store']);

})
  .prefix('file')
  .middleware(['auth'])
);


//site routes
addPrefixToGroup(Route.group(() => {

  Route.post('/', 'SiteController.store')
  Route.get('/', 'SiteController.index')
  Route.delete('/:id', 'SiteController.destroy')

})
  .prefix('site')
  .middleware(['auth'])
);

//tasks routes
addPrefixToGroup(Route.group(() => {

  Route.post('/', 'TimeController.store')
  Route.get('/', 'TimeController.index')
  Route.get('/:id', 'TimeController.show')
  Route.put('/:id', 'TimeController.update')
  Route.delete('/:id', 'TimeController.destroy')

})
  .prefix('time')
  .middleware(['auth'])
);

addPrefixToGroup(Route.group(() => {
  Route.get('/' , 'RestrictGroupController.index')
  Route.post('/', 'RestrictGroupController.store')
  // if i get some free time at the end i coud add a route that take a group id and give back restricted sites for it or the other side of this logic
  Route.delete('/:id', 'RestrictGroupController.destroy')

})
  .prefix('restrict_group')
  .middleware(['auth'])
);

addPrefixToGroup(Route.group(() => {
  Route.get('/' , 'RestrictUserController.index')
  Route.post('/', 'RestrictUserController.store')
  // if i get some free time at the end i coud add a route that take a user id and give back restricted sites for it or the other side of this logic
  Route.delete('/:id', 'RestrictUserController.destroy')

})
  .prefix('restrict_user')
  .middleware(['auth'])
);

addPrefixToGroup(Route.group(() => {
  Route.get('/' , 'UnproductiveController.index')
  Route.post('/', 'UnproductiveController.store')

})
  .prefix('unproductive')
  .middleware(['auth'])
)

addPrefixToGroup(Route.group(() => {
  Route.get('/' , 'ProductivityController.index')

})
  .prefix('productivity')
  .middleware(['auth'])
)

// This has to be the last route
Route.any('*', ({ view }) => view.render('app'));

