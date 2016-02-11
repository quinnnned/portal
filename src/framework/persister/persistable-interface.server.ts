export interface Persistable {
    getPersistenceGroup() :string;
    getPersistenceKey()   :string;
}