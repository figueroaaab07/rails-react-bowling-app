Rails.application.routes.draw do
  resources :frames
  resources :bowler_games
  resources :bowlers
  resources :games
  resources :match_teams
  resources :teams
  resources :matches
  resources :tournaments
  resources :locations
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
