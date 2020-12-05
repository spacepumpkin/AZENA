# == Route Map
#
#                    Prefix Verb   URI Pattern                                                                              Controller#Action
#               api_session DELETE /api/session(.:format)                                                                   api/sessions#destroy {:format=>:json}
#                           POST   /api/session(.:format)                                                                   api/sessions#create {:format=>:json}
#                 api_users POST   /api/users(.:format)                                                                     api/users#create {:format=>:json}
#                  api_user GET    /api/users/:id(.:format)                                                                 api/users#show {:format=>:json}
#            api_workspaces GET    /api/workspaces(.:format)                                                                api/workspaces#index {:format=>:json}
#                           POST   /api/workspaces(.:format)                                                                api/workspaces#create {:format=>:json}
#             api_workspace GET    /api/workspaces/:id(.:format)                                                            api/workspaces#show {:format=>:json}
#                           DELETE /api/workspaces/:id(.:format)                                                            api/workspaces#destroy {:format=>:json}
#                       api GET    /api/users/:id/everything(.:format)                                                      api/users#everything {:format=>:json}
#                  new_test GET    /session/new(.:format)                                                                   tests#new
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
    resources :users, only: [:create, :show]
    resources :workspaces, only: [:create, :destroy, :update, :show, :index]
    resources :projects, only: [:create, :update, :destroy]
    get "/users/:id/everything", to: "users#everything"
  end

  resource :test, only: [:new], path: "session"

  root to: "static_pages#root"
  # get '*path', to: "static_pages#root"
end 
