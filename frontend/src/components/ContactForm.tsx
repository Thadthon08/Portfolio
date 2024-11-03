import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { Sparkles } from "lucide-react";

interface FormInputs {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    try {
      await emailjs.send(
        "service_0tjrdqw",
        "template_4z31ex6",
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
        "PuLtUxp_OcBHSLnl0"
      );
      alert("Message sent successfully!");
      reset();
    } catch (error) {
      alert("Failed to send message. Please try again later.");
      console.error("EmailJS error:", error);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-xl space-y-6"
    >
      {/* Name Field */}
      <div className="relative group">
        <input
          {...register("name", { required: "Your name is required" })}
          className="
                w-full
                bg-transparent
                border-2
                border-yellow-500/30
                rounded-lg
                px-4
                py-3
                text-yellow-50
                placeholder-yellow-100/50
                focus:outline-none
                focus:border-yellow-400
                transition-all
                duration-300
                backdrop-blur-sm
                group-hover:border-yellow-400/50
              "
          placeholder="Enter your name"
        />
        {errors.name && (
          <span className="text-red-400 text-sm mt-1 block">
            {errors.name.message}
          </span>
        )}
      </div>

      {/* Email Field */}
      <div className="relative group">
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          className="
                w-full
                bg-transparent
                border-2
                border-yellow-500/30
                rounded-lg
                px-4
                py-3
                text-yellow-50
                placeholder-yellow-100/50
                focus:outline-none
                focus:border-yellow-400
                transition-all
                duration-300
                backdrop-blur-sm
                group-hover:border-yellow-400/50
              "
          placeholder="Your email"
        />
        {errors.email && (
          <span className="text-red-400 text-sm mt-1 block">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Message Field */}
      <div className="relative group">
        <textarea
          {...register("message", {
            required: "Message is required",
            minLength: { value: 10, message: "Minimum 10 characters required" },
          })}
          className="
                w-full
                bg-transparent
                border-2
                border-yellow-500/30
                rounded-lg
                px-4
                py-3
                text-yellow-50
                placeholder-yellow-100/50
                focus:outline-none
                focus:border-yellow-400
                transition-all
                duration-300
                backdrop-blur-sm
                group-hover:border-yellow-400/50
              "
          placeholder="Your message"
        />
        {errors.message && (
          <span className="text-red-400 text-sm mt-1 block">
            {errors.message.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`
                relative
                px-8
                py-3
                rounded-lg
                font-medium
                text-lg
                bg-yellow-400/20
                text-yellow-300
                border-2
                border-yellow-400/50
                hover:bg-yellow-400/30
                hover:border-yellow-400
                transition-all
                duration-300
                disabled:opacity-50
                group
                overflow-hidden
              `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            {isSubmitting ? "Casting Spell..." : "Cast Your Message!"}
          </span>
          <motion.div
            className="absolute inset-0 -z-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/30 to-yellow-400/0"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "linear",
            }}
          />
        </motion.button>
      </div>
    </motion.form>
  );
};

export default ContactForm;
