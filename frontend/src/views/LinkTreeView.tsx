// * External imports
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// * Internal imports
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { isValidUrl } from "../utils";
import { updateProfileFront } from "../api/DevTreeAPI";

function LinkTreeView() {
  const [devTreeLinks, setDevTreeLinks] = useState(social);


  const queryClient = useQueryClient()
  const user : User = queryClient.getQueryData(['user'])!
  const { mutate } = useMutation({
    mutationFn: updateProfileFront,
    onError: (error) => {
      toast.error(error.message)

    },
    onSuccess: () => {
      toast.success('Actualizado Correctamente')
    }
  })
  

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
    setDevTreeLinks(updatedLinks);

    queryClient.setQueryData(['user'], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedLinks)
      }
    })
  };

  return (
    <div className="space-y-5">
      {devTreeLinks.map((item) => (
        <DevTreeInput key={item.name} item={item} handleUrlChange={handleUrlChange} handleEnableLink={handleEnableLink} />
      ))}
      <button 
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-xl font-bold"
        onClick={() => mutate(user)}
      >Guardar Cambios</button>
    </div>
  );
}

export default LinkTreeView;
