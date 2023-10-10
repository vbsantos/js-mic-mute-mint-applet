const Applet = imports.ui.applet;
const GLib = imports.gi.GLib;
const Lang = imports.lang;
const Mainloop = imports.mainloop;

function MicStatusApplet(orientation, panel_height, instance_id) {
    this._init(orientation, panel_height, instance_id);
}

MicStatusApplet.prototype = {
    __proto__: Applet.IconApplet.prototype,

    _init: function (orientation, panel_height, instance_id) {
        Applet.IconApplet.prototype._init.call(this, orientation, panel_height, instance_id);

        this.set_applet_icon_name("audio-input-microphone");
        this.set_applet_tooltip("Microphone status");

        this._updateMicStatus();
        this.timeout = Mainloop.timeout_add_seconds(1, Lang.bind(this, this._updateMicStatus));
    },

    _updateMicStatus: function () {
        let cmd = `bash -c "pactl list sources | grep -A 10 \\"$(pactl info | grep \\"Fonte padrão\\" | awk '{print $3}')\\" | grep \\"Mudo:\\" | awk '{print $2}'"`;
        let [result, out, err, status] = GLib.spawn_command_line_sync(cmd);

        let output = out.toString();

        if (output.includes("não")) {
            this.set_applet_icon_name("mic-on");
        } else {
            this.set_applet_icon_name("mic-ready");
        }

        return true;
    },

    on_applet_removed_from_panel: function () {
        if (this.timeout) {
            GLib.source_remove(this.timeout);
            this.timeout = null;
        }
    },

    on_applet_clicked: function () {
        let cmd = `bash -c "pactl set-source-mute @DEFAULT_SOURCE@ toggle"`;
        GLib.spawn_command_line_sync(cmd);
    }
};

function main(metadata, orientation, panel_height, instance_id) {
    return new MicStatusApplet(orientation, panel_height, instance_id);
}
