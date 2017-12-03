class AddAttachmentAttachmentToFacilties < ActiveRecord::Migration[5.1]
  def self.up
    change_table :restaurants do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :facilities, :attachment
  end
end
