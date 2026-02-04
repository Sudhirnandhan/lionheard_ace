import { motion } from "framer-motion";
import { Bell, Mail, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NotificationPanel from "./NotificationPanel";

const Header = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between"
    >
      {/* Title */}
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground text-glow tracking-wider">
          Lead Management <span className="text-primary">ACE</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Advanced Customer Engagement</p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Notification Icons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground hover:text-foreground hover:bg-background/30"
          >
            <Mail className="w-5 h-5" />
          </Button>
          <NotificationPanel />
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-border/50">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">Tester</p>
            <p className="text-xs text-muted-foreground">System Administrator</p>
          </div>
          <Avatar className="w-10 h-10 border-2 border-primary/30">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/20 text-primary">TS</AvatarFallback>
          </Avatar>
          <Button
            variant="outline"
            size="sm"
            className="bg-background/30 border-border/50 text-muted-foreground hover:text-foreground hover:bg-background/50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
