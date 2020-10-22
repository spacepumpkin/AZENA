# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

# Global camelizing of ruby snake_case keys for jbuilder
Jbuilder.key_format camelize: :lower