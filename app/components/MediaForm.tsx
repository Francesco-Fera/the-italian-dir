import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MediaForm() {
  return (
    <div className='space-y-4'>
      <FormItem>
        <Label htmlFor='avatar'>Avatar URL</Label>
        <Input id='avatar' name='avatar' type='url' />
      </FormItem>
      <FormItem>
        <Label htmlFor='cover'>Cover Image URL</Label>
        <Input id='cover' name='cover' type='url' />
      </FormItem>
    </div>
  );
}
