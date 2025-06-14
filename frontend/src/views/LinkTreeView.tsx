// * External imports
import { useState } from "react";

// * Internal imports
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { isValidUrl } from "../utils";
import { toast } from "sonner";

function LinkTreeView() {
  const [devTreeLinks, setDevTreeLinks] = useState(social);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map((link) => (link.name === e.target.name ? { ...link, url: e.target.value } : link));
    setDevTreeLinks(updatedLinks);
  };

  const handleEnableLink = (socialNetwork: string) => {
    const updatedLinks = devTreeLinks.map((link) => {
      if (link.name === socialNetwork) {
        if (isValidUrl(link.url)) {
          link.enabled = !link.enabled;
          return link;
        }
        toast.error('Invalid URL')
      }
      return link;
    });
    console.log(updatedLinks);
    setDevTreeLinks(updatedLinks);
  };

  return (
    <div className="space-y-5">
      {devTreeLinks.map((item) => (
        <DevTreeInput key={item.name} item={item} handleUrlChange={handleUrlChange} handleEnableLink={handleEnableLink} />
      ))}
    </div>
  );
}

export default LinkTreeView;
