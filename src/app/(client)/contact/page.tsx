import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const ContactUs = () => {
  return (
    <div className="mt-12 mb-8 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
      <p className="mt-2 text-gray-600">
        Whether you have questions, feedback, or just want to say hello, we’re here to listen.
      </p>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Message Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription>
              Share your thoughts, and we’ll respond promptly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <Input placeholder="Full Name" required className="placeholder:text-gray-400" />
              <Input
                type="email"
                placeholder="Email Address"
                required
                className="placeholder:text-gray-400"
              />
              <Textarea
                placeholder="Write your message here..."
                required
                className="placeholder:text-gray-400"
              />
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="">
          <Card>
            <CardHeader>
              <CardTitle className="py-5">Our Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-12">
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-gray-500" />
                <span className="text-gray-700">1234 Gulshan, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-gray-500" />
                <span className="text-gray-700">+880 123-456-7890</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-gray-500" />
                <span className="text-gray-700">eShop@gmail.com</span>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Location Map */}
      <Card className="h-[500px] mt-10">
        <CardHeader>
          <CardTitle>Find Us Here</CardTitle>
        </CardHeader>
        <CardContent className="h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d542.833375160234!2d90.36459193592796!3d23.756894798516043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bfa7f9ab16df%3A0xc02bb858ab57093b!2sNazra!5e0!3m2!1sen!2sbd!4v1730135843249!5m2!1sen!2sbd"
            style={{ border: 0 }}
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          ></iframe>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactUs;
