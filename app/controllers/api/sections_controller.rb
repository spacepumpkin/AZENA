class Api::SectionsController < ApplicationController
  before_action :require_logged_in

  def create
    @section = Section.new(section_params)
    if @section.save
      render :show, status: 200
    else
      render json: @section.errors.full_messages, status: 422
    end
  end

  def update
    @section = Section.find_by(id: params[:id])
    if @section.nil?
      render json: ["Project section was not found"], status: 404
      return
    end

    if @section.update({ name: params[:section][:name], order: params[:section][:order] })
      render :show, status: 200
    else
      render json: ["Project section could not be updated"], status: 422
    end
  end

  def destroy
    @section = Section.includes(:tasks).find_by(id: params[:id])
    if @section.nil?
      render json: ["Project section was not found"], status: 404
      return
    end
    # Depending on given boolean from params, we throw away or keep (default) section tasks
    if params[:keep_tasks] == false
      # Erase all section tasks
      Task.destroy_all(section_id: params[:id])
    else
      # Keep tasks but erase section_id from them
      # @section.tasks.each do |task|
      #   task.update({ section_id: nil })
      # end
      Task.where(section_id: params[:id]).update_all(section_id: nil)
    end

    # After handling tasks, destroy section
    if @section.destroy
      render :show, status: 200
    else
      render json: ["Project section could not be removed"], status: 422
    end
  end

  private

  def section_params
    params.require(:section).permit(:name, :project_id, :order)
  end
end
