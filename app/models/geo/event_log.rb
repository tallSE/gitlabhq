module Geo
  class EventLog < ActiveRecord::Base
    include Geo::Model

    belongs_to :repository_updated_event,
      class_name: 'Geo::RepositoryUpdatedEvent',
      foreign_key: :repository_updated_event_id

    belongs_to :repository_deleted_event,
      class_name: 'Geo::RepositoryDeletedEvent',
      foreign_key: :repository_deleted_event_id

    belongs_to :repository_renamed_event,
      class_name: 'Geo::RepositoryRenamedEvent',
      foreign_key: :repository_renamed_event_id

    def event
      repository_updated_event ||
      repository_deleted_event ||
      repository_renamed_event
    end

    def project_id
      event&.project_id
    end
  end
end
