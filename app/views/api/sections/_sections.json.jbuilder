sections.each do |section|
  json.set! section.id do
    json.partial! "api/sections/section.json.jbuilder", section: section
  end
end
