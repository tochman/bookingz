require 'coveralls'
Coveralls.wear_merged!('rails')

require 'cucumber/rails'
require 'capybara-screenshot/cucumber'
require_relative 'temporal'

ActionController::Base.allow_rescue = false
Settings.mode = :daily_view

begin
  DatabaseCleaner.strategy = :transaction
rescue NameError
  raise 'You need to add database_cleaner to your Gemfile ' \
        '(in the :test group) if you wish to use it.'
end

Cucumber::Rails::Database.javascript_strategy = :truncation

Chromedriver.set_version '2.33'

Capybara.register_driver :chrome do |app|
  capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(
      chromeOptions: {
          args: %w[ no-sandbox disable-popup-blocking disable-gpu window-size=1280,1024]
      }
  )

  Capybara::Selenium::Driver.new(app, browser: :chrome, desired_capabilities: capabilities)
end


Capybara.register_server :puma do |app, port, host|
  require 'puma'
  Puma::Server.new(app).tap do |s|
    s.add_tcp_listener host, port
  end.run.join
end

Before do
  Aws.config[:s3] = {stub_responses: true}
end

Capybara.server = :puma

Capybara.javascript_driver = :chrome
Capybara.default_max_wait_time = 10

World(Temporal)
