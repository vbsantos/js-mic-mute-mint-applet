const Applet = imports.ui.applet;
const GLib = imports.gi.GLib;
const Lang = imports.lang;
const Mainloop = imports.mainloop;

function MicStatusApplet(orientation, panel_height, instance_id) {
    this._init(orientation, panel_height, instance_id);
}

// Run a bash command to verify if the default audio input is muted
function IsMicrophoneMuted() {
    const cmd = `bash -c "pactl list sources | grep -A 10 \\"$(pactl info | grep \\"Fonte padrão\\" | awk '{print $3}')\\" | grep \\"Mudo:\\" | awk '{print $2}'"`;
    const [result, out, err, status] = GLib.spawn_command_line_sync(cmd);
    const isMuted = out.toString().includes("sim");
    return isMuted;
}

// Run a bash command to toggle the default audio input
function ToggleMicrophone() {
    const cmd = `bash -c "pactl set-source-mute @DEFAULT_SOURCE@ toggle"`;
    GLib.spawn_command_line_sync(cmd);
}

MicStatusApplet.prototype = {
    __proto__: Applet.IconApplet.prototype,

    _init: function (orientation, panel_height, instance_id) {
        Applet.IconApplet.prototype._init.call(this, orientation, panel_height, instance_id);
        this._setAppletState();
        this.timeout = Mainloop.timeout_add_seconds(1, Lang.bind(this, this._setAppletState));
    },

    _setAppletState: function () {
        const isMuted = IsMicrophoneMuted();
        if (isMuted) {
            this.set_applet_icon_name("mic-custom-off");
            this.set_applet_tooltip("Microphone Off");
        } else {
            this.set_applet_icon_name("mic-custom-on");
            this.set_applet_tooltip("Microphone On");
        }

        return true;
    },

    on_applet_clicked: function () {
        ToggleMicrophone();
        this._setAppletState();
    },

    on_applet_removed_from_panel: function () {
        if (this.timeout) {
            GLib.source_remove(this.timeout);
            this.timeout = null;
        }
    }
};

function main(metadata, orientation, panel_height, instance_id) {
    return new MicStatusApplet(orientation, panel_height, instance_id);
}
