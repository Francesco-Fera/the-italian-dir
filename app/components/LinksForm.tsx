import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LinksForm() {
  return (
    <div className='space-y-4'>
      <FormItem>
        <Label htmlFor='website'>Website</Label>
        <Input id='website' name='website' type='url' />
      </FormItem>
      <FormItem>
        <Label htmlFor='twitter'>Twitter</Label>
        <Input id='twitter' name='twitter' />
      </FormItem>
      <FormItem>
        <Label htmlFor='github'>GitHub</Label>
        <Input id='github' name='github' />
      </FormItem>
    </div>
  );
}
