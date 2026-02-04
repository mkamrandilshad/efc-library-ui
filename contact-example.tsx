import { ProfileCard } from "./src/components/profile-card"

// Contact Information Card (like your screenshot)
export const ContactInfoExample = () => (
  <ProfileCard
    // Don't pass avatar prop at all, or pass avatar={{ show: false }}
    header={{
      title: "Contact Information"
    }}
    details={[
      { label: "Contact Name", value: { type: "text", value: "Jane Smith" } },
      { label: "Town", value: { type: "text", value: "London" } },
      { label: "County", value: { type: "text", value: "Greater London" } },
      { label: "Post Code", value: { type: "text", value: "SW1A 1AA" } },
      { label: "E-Mail Address", value: { type: "text", value: "jane.smith@example.com" } },
      { label: "Telephone Mobile", value: { type: "text", value: "+44 20 7123 4567" } }
    ]}
    actions={[
      { label: "Edit Information", onClick: () => console.log("Edit contact") }
    ]}
  />
)

// Alternative: Explicitly hide avatar
export const ContactInfoExample2 = () => (
  <ProfileCard
    avatar={{ show: false }}  // Explicitly hide avatar
    header={{
      title: "Contact Information"
    }}
    details={[
      { label: "Contact Name", value: { type: "text", value: "Jane Smith" } },
      { label: "Town", value: { type: "text", value: "London" } },
      { label: "County", value: { type: "text", value: "Greater London" } },
      { label: "Post Code", value: { type: "text", value: "SW1A 1AA" } },
      { label: "E-Mail Address", value: { type: "text", value: "jane.smith@example.com" } },
      { label: "Telephone Mobile", value: { type: "text", value: "+44 20 7123 4567" } }
    ]}
    actions={[
      { label: "Edit Information", onClick: () => console.log("Edit contact") }
    ]}
  />
)
