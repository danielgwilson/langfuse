import { PagedSettingsContainer } from "@/src/components/PagedSettingsContainer";
import Header from "@/src/components/layouts/header";
import RenameOrganization from "@/src/features/organizations/components/RenameOrganization";

const OrgSettingsPage = () => {
  return (
    <div className="md:container">
      <Header title="Settings" />
      <PagedSettingsContainer
        pages={[
          {
            title: "General",
            content: (
              <div className="flex flex-col gap-10">
                <RenameOrganization />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default OrgSettingsPage;
