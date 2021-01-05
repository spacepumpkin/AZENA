# == Route Map
#
#                    Prefix Verb   URI Pattern                                                                              Controller#Action
#               api_session DELETE /api/session(.:format)                                                                   api/sessions#destroy {:format=>:json}
#                           POST   /api/session(.:format)                                                                   api/sessions#create {:format=>:json}
#       everything_api_user GET    /api/users/:id/everything(.:format)                                                      api/users#everything {:format=>:json}
#       workspaces_api_user DELETE /api/users/:id/workspaces(.:format)                                                      api/users#unassign_workspace {:format=>:json}
#            tasks_api_user POST   /api/users/:id/tasks(.:format)                                                           api/users#assign_task {:format=>:json}
#                           DELETE /api/users/:id/tasks(.:format)                                                           api/users#unassign_task {:format=>:json}
#                 api_users POST   /api/users(.:format)                                                                     api/users#create {:format=>:json}
#                  api_user GET    /api/users/:id(.:format)                                                                 api/users#show {:format=>:json}
#            api_workspaces GET    /api/workspaces(.:format)                                                                api/workspaces#index {:format=>:json}
#                           POST   /api/workspaces(.:format)                                                                api/workspaces#create {:format=>:json}
#             api_workspace GET    /api/workspaces/:id(.:format)                                                            api/workspaces#show {:format=>:json}
#                           PATCH  /api/workspaces/:id(.:format)                                                            api/workspaces#update {:format=>:json}
#                           PUT    /api/workspaces/:id(.:format)                                                            api/workspaces#update {:format=>:json}
#                           DELETE /api/workspaces/:id(.:format)                                                            api/workspaces#destroy {:format=>:json}
#              api_projects POST   /api/projects(.:format)                                                                  api/projects#create {:format=>:json}
#               api_project PATCH  /api/projects/:id(.:format)                                                              api/projects#update {:format=>:json}
#                           PUT    /api/projects/:id(.:format)                                                              api/projects#update {:format=>:json}
#                           DELETE /api/projects/:id(.:format)                                                              api/projects#destroy {:format=>:json}
#              api_sections POST   /api/sections(.:format)                                                                  api/sections#create {:format=>:json}
#               api_section PATCH  /api/sections/:id(.:format)                                                              api/sections#update {:format=>:json}
#                           PUT    /api/sections/:id(.:format)                                                              api/sections#update {:format=>:json}
#                           DELETE /api/sections/:id(.:format)                                                              api/sections#destroy {:format=>:json}
#                 api_tasks POST   /api/tasks(.:format)                                                                     api/tasks#create {:format=>:json}
#                  api_task PATCH  /api/tasks/:id(.:format)                                                                 api/tasks#update {:format=>:json}
#                           PUT    /api/tasks/:id(.:format)                                                                 api/tasks#update {:format=>:json}
#                           DELETE /api/tasks/:id(.:format)                                                                 api/tasks#destroy {:format=>:json}
#              api_feedback POST   /api/feedback(.:format)                                                                  api/feedbacks#create {:format=>:json}
#                      root GET    /                                                                                        static_pages#root
#        rails_service_blob GET    /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
# rails_blob_representation GET    /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
#        rails_disk_service GET    /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
# update_rails_disk_service PUT    /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
#      rails_direct_uploads POST   /rails/active_storage/direct_uploads(.:format)                                           active_storage/direct_uploads#create

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: {format: :json} do 
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :show] do 
      member do 
        get 'everything' # users/:user_id/everything
        delete 'workspaces', to: 'users#unassign_workspace' # users/:user_id/workspaces
        post 'tasks', to: 'users#assign_task' # users/:user_id/tasks
        delete 'tasks', to: 'users#unassign_task' # users/:user_id/tasks
      end
    end
    resources :workspaces, only: [:create, :destroy, :update, :show, :index]
    resources :projects, only: [:create, :update, :destroy]
    resources :sections, only: [:create, :update, :destroy]
    resources :tasks, only: [:create, :update, :destroy]
    resource :feedback, only: [:create]
    # get "/users/:id/everything", to: "users#everything"
  end

  # resource :test, only: [:new], path: 'session'

  root to: 'static_pages#root'
  # get '*path', to: "static_pages#root"
end 
