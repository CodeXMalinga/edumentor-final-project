import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingsByUserId from "@/app/actions/getListingsByUserId";

import SubjectsClient from "./SubjectsClient";

const SubjectsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const listings = await getListingsByUserId({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No subjects found"
          subtitle="Looks like you have no subjects listed. Create a new subject"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <SubjectsClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default SubjectsPage;
