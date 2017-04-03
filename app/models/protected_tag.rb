class ProtectedTag < ActiveRecord::Base
  include Gitlab::ShellAdapter
  include ProtectedRef

  has_many :push_access_levels, dependent: :destroy

  validates :push_access_levels, length: { is: 1, message: "are restricted to a single instance per protected tag." }

  accepts_nested_attributes_for :push_access_levels

  def self.protected?(project, ref_name)
    protected_refs = project.protected_tags_array
    self.matching(ref_name, protected_refs: protected_refs).present?
  end
end
