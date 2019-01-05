require 'HTTParty'
require 'Nokogiri'
require 'JSON'
require 'Pry'
require 'csv'
require 'date'
require 'Mechanize'


# # initialization
url_start = 'https://venmo.com/vishva-mehta'
transaction_array = []

# generate page url by specifying which object# to start at, instead of page number
# page = HTTParty.get(url_start)
# parse_page = Nokogiri::HTML(page)
# puts parse_page


email = '9089170284'
password = 'Snuggl1etemp'

# Create a new mechanize object
agent = Mechanize.new

# Load the postmarkapp website
page = agent.get('https://venmo.com/account/sign-in/')

# Select the first form
form = agent.page.forms.first
form.field_with(:name => "phoneEmailUsername").value = email
form.field_with(:name => "password").value = password

# Submit the form
page = form.submit form.buttons.first
puts page.body



# <form class="auth-form" action="/account/login" method="post" data-reactid="18">
# 	<fieldset class="inputs" data-reactid="19">
# 		<label class="auth-form-input-label" data-reactid="20">
# 			<span class="label-text" data-reactid="21">Email, Mobile, or User Name</span>
# 				<input type="text" class="auth-form-input" aria-label="username" placeholder="" name="phoneEmailUsername" data-reactid="22"/>
# 			<span data-reactid="23"></span>
# 		</label>
# 		<div class="auth-password-container" data-reactid="24">
# 			<label class="auth-form-input-label" data-reactid="25">
# 				<span class="label-text" data-reactid="26">Password</span>
# 				<input type="password" class="auth-form-input" aria-label="password" placeholder="•••••••" name="password" data-reactid="27"/>
# 				<span data-reactid="28"></span>
# 			</label>
# 		</div>
# 	</fieldset>
# 	<div class="button-wrapper" data-reactid="29">
# 		<button class="ladda-button auth-button" type="submit" data-style="zoom-out" data-reactid="30">
# 			<span class="ladda-label" data-reactid="31">Sign In</span>
# 			<span class="ladda-spinner" data-reactid="32"></span>
# 		</button>
# 	</div>
# </form>




# login_link =  page.search('.login').first rescue nil  #nokogyri object 
# login_href =  next_page_link['href'] rescue nil  # '/local/link/file.html'
# puts login_href

# login_page = agent.get(login_href) if login_href  # goes to 'http://somesite.com/local/link/file.html'
# puts login_page.body



# parse_page = Nokogiri::HTML(page)
# puts parse_page
# parse_page.css('.single-payment').map do |c|
# 	# puts c.css('.paymentpage-payment-container').css('.paymentpage-textbox')
# 	actor = c.css('.paymentpage-subline').css('a')[0].text
# 	target = c.css('.paymentpage-subline').css('a')[1].text
# 	description = c.css('.paymentpage-text').text
# 	time = c.css('.paymentpage-datetime').css('.date').text.split(' on ')[1].split(' - Comments')[0]
# 	# puts actor,target,description,time
# 	transaction = [
# 		actor.encode('UTF-8', :invalid => :replace, :undef => :replace),
# 		target.encode('UTF-8', :invalid => :replace, :undef => :replace),
# 		description.encode('UTF-8', :invalid => :replace, :undef => :replace),
# 		time.encode('UTF-8', :invalid => :replace, :undef => :replace),
# 	]
# 	transaction_array.push(transaction)
# end


# # write to csv
# CSV.open('visvha-mehta.csv', 'w') do |csv|
# 	transaction_array.each do |c|
# 		csv << c
# 	end
# end