Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy, :show]
    resources :polls, only: [:create, :destroy, :show, :index]
    resources :choices, only: [:create, :destroy, :show, :index]
    resources :groups, only: [:create, :destroy, :show, :index]
    resources :responses, only: [:create, :destroy, :show, :index]


  end

  root "static_pages#root"
end
