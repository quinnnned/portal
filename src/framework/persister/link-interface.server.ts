export interface Link {
    getIsSymmetric()      :boolean;
    
    getLinkParentGroup()  :string;
    getLinkParentField()  :string;
    getLinkParentIsMany() :boolean; // MANY (true) OR ONE (false)
    
    getLinkChildGroup()   :string;
    getLinkChildField()   :string;
    getLinkChildIsMany()  :boolean; // MANY (true) OR ONE (false)
}