class Api::FeedbacksController < ApplicationController
  def create
    @feedback = Feedback.new(feedback_params)
    if @feedback.save
      render json: ["Feedback Submitted!"], status: 200
    else
      render json: [@feedback.errors.first[1]], status: 422
    end
  end

  private

  def feedback_params
    params.require(:feedback).permit(:name, :email, :improvements, :other_comments)
  end
end
