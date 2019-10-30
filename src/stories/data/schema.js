export const simpleSchema = {
  onSubmit: (values) => { console.log("submit:", values) },
  inputs: {
    cow: {
      label: "cow",
      type: "text",
      validate: ({ value }) => {
        if (value === "0metoo") {
          return "not valid"
        }
      },
    },
    selectOne: {
      label: "select ONe",
      type: "select",
      options: [{ label: "Select One", value: null, selected: true, hidden: true }, { label: "true", value: true }, { label: "false", value: false }]
      
    },
    friend: {
      label: "friend",
      type: "text",
      initialValue: "joe",
      visibleIf: ({ rowValues }) => {
        if (rowValues.cow === "0metoo") {
          return false
        }
      }
    }
  }
}
export const simpleSchemaInitialValues = [{ cow: "0metoo", friend: '0ow' }, { cow: "1mesftoo", friend: "1wowow" }, { cow: "2mesftoo", friend: "2wowow" }] 