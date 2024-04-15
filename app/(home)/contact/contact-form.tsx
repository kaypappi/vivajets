"use client";


const ContactForm = () => {
  return (
    <form
      action="https://viva-jets.us8.list-manage.com/subscribe/post?u=775ebfd74ac13f416e56a8db7&amp;id=8e736064df&amp;f_id=00cb76e0f0"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      className="validate"
      target="_self"
    >
      <div id="mc_embed_signup_scroll flex flex-col gap-8">
        <div className="mc-field-group mb-8">
          <label
            htmlFor="mce-FNAME"
            className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Full name <span className="asterisk">*</span>
          </label>
          <input
            type="text"
            name="FNAME"
            className="flex mt-2 h-10 w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800"
            id="mce-FNAME"
            required={true}
          />
        </div>
        <div className="mc-field-group mb-8">
          <label
            htmlFor="mce-EMAIL"
            className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Email Address <span className="asterisk">*</span>
          </label>
          <input
            type="email"
            name="EMAIL"
            className="flex mt-2 h-10 w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800"
            id="mce-EMAIL"
            required={true}
          />
        </div>
        <div className="mc-field-group mb-8">
          <label
            htmlFor="mce-LNAME"
            className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Phone number <span className="asterisk">*</span>
          </label>
          <input
            type="tel"
            name="LNAME"
            className="flex mt-2 h-10 w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800"
            id="mce-LNAME"
            required={true}
          />
        </div>
        
        <div className="mc-field-group mb-8">
          <label
            htmlFor="mce-MMERGE6"
            className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Select Request Type{" "}
          </label>
          <select
            name="MMERGE6"
            required={true}
            defaultValue={""}
            className="flex mt-2 h-10 w-full items-center justify-between rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:border-slate-800 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-800"
          >
            <option disabled hidden value="">
              Select Request Type
            </option>
            <option value="Private &amp; Business Jet Charter">
              Private &amp; Business Jet Charter
            </option>
            <option value="Aircraft Management">Aircraft Management</option>
            <option value="Fractional Ownership">Fractional Ownership</option>
          </select>
        </div>
        <div className="mc-field-group">
          <label
            htmlFor="mce-MMERGE13"
            className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Message
          </label>
          <textarea
            rows={5}
            name="MMERGE13"
            className=" flex mt-2 mb-8 h-10 w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800"
            id="mce-MMERGE13"
            required={true}
          />
        </div>
        <div>
          <input type="hidden" name="tags" value="4900896" />
        </div>
        <div id="mce-responses" className="clear">
          <div className="response" id="mce-error-response"></div>
          <div className="response" id="mce-success-response"></div>
        </div>
        <div className="clear">
          <input
            type="submit"
            name="subscribe"
            id="mc-embedded-subscribe"
            className="w-full cursor-pointer py-[0.8rem] px-10 inline-flex items-center justify-center transition-all rounded-full text-sm font-medium ring-offset-white  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-800 bg-clay text-white hover:bg-clay hover:bg-opacity-[.16] hover:backdrop-blur-lg ring-transparent ring-2 hover:ring-clay dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90"
            value="Get In Touch"
          />
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
